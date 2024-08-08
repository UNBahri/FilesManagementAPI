namespace FilesManagementAPI
{
    public class DocumentAttachments
    {   
        public int Id { get; set; }
        public string FileName { get; set; }

        public string FileExtension { get; set; }
        public string FilePath {  get; set; }

        public DateTime DateUploaded {get; set;}
    }
}
