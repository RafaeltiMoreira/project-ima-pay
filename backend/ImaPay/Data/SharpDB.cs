using Microsoft.EntityFrameworkCore;
using System.Models;

namespace System.Context
{
    public class SharpDB : DbContext
    {

        public SharpDB(DbContextOptions<SharpDB> options) : base(options) { }


        public DbSet<Usuario> Usuarios { get; set; }

        public DbSet<Transferencia> Transferencias { get; set; }

        public DbSet<Endereco> Enderecos { get; set; }

    }

}