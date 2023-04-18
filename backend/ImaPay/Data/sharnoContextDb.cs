using ImaPay.Entity.Models;
using Microsoft.EntityFrameworkCore;

namespace ImaPay.Data
{
    public class sharnoContextDb: DbContext
    {

        public sharnoContextDb(DbContextOptions<sharnoContextDb> options): base(options)  { 
        
        
        
        
        
        }

        
        public DbSet<Usuario> usuarios { get; set; }

        public DbSet<Transacao> transacaos { get; set; }

        public DbSet<Endereco> enderecos { get; set; }  


    }
}
