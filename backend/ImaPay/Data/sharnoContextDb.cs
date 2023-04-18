using ImaPay.Entity.Models;
using Microsoft.EntityFrameworkCore;

namespace ImaPay.Data
{
    public class sharnoContextDb: DbContext
    {

        public sharnoContextDb(DbContextOptions<sharnoContextDb> options): base(options)  { 
        
        
        
        
        
        }

        
        public DbSet<Usuario> Usuarios { get; set; }

        public DbSet<Transacao> Transacaos { get; set; }

        public DbSet<Endereco> Enderecos { get; set; }  


    }
}
