using FilesManagementAPI.Database;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.StaticFiles;

namespace FilesManagementAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DocumentsUploaderController : ControllerBase
    {
        public static ApplicationDbContext _context;

        public DocumentsUploaderController(ApplicationDbContext dbContext)
        {
            _context = dbContext;   
        }

        [HttpPost]
        

        public async Task<IActionResult> UploadFile(IFormFile file)
        {

            var filename = Path.GetRandomFileName() + DateTime.Now.ToString("yyyymmddhhmmss") + "_" + file.FileName;


            if (file !=null && file.Length > 0)
            {



                try
                {

                    var extension = Path.GetExtension(filename);
                    var filepath = Path.Combine(Directory.GetCurrentDirectory(), "Uploads\\Documents");


                    if (!Directory.Exists(filepath))
                    {
                        Directory.CreateDirectory(filepath);

                    }

                    var completepath = Path.Combine(Directory.GetCurrentDirectory(), "Uploads\\Documents", filename);
                    using (var stream = new FileStream(completepath, FileMode.Create))
                    {
                        await file.CopyToAsync(stream);
                    }

                    //Update the Database
                    var filedetails = new DocumentAttachments
                    {
                        FileName = filename,
                        FileExtension = extension,
                        DateUploaded = DateTime.Now,
                        FilePath = completepath,
                    };

                    _context.Add(filedetails);
                    await _context.SaveChangesAsync();





                }
                catch (Exception ex)
                {
                    throw ex;
                }
            }
            else
            {
                return BadRequest();
            }
            return Ok(filename);
        }

        [HttpGet]
        [Route("DownloadFile")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(string), StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> DownloadFile(string filename)
        {
            var completepath = Path.Combine(Directory.GetCurrentDirectory(), "Uploads\\Documents", filename);


            var provider = new FileExtensionContentTypeProvider();
        
            if(!provider.TryGetContentType(completepath, out var contentType))
            {
                contentType = "application/octet-stream";
            }

            var bytes = await System.IO.File.ReadAllBytesAsync(completepath);
            return File(bytes, contentType, Path.GetFileName(completepath));
        }

    }
}
