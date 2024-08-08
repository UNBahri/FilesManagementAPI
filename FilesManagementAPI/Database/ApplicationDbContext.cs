using Microsoft.EntityFrameworkCore;




namespace FilesManagementAPI.Database



{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options) { 
        
        
        }
        public DbSet<DocumentAttachments> DocumentAttachments { get; set; }
    }
}
