using ImaPay.Entity.Models;
using Microsoft.EntityFrameworkCore;

namespace ImaPay.Data;

public class SharnoContextDb : DbContext
{
    public DbSet<Usuario> Usuarios { get; set; }

    public DbSet<Transacao> Transacoes { get; set; }

    public DbSet<Endereco> Enderecos { get; set; }

    public SharnoContextDb(DbContextOptions<SharnoContextDb> options) : base(options)
    {
    }
}

