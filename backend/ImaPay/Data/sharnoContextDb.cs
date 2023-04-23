using ImaPay.Entity.Models;
using Microsoft.EntityFrameworkCore;
using AutoMapper;
using Microsoft.AspNetCore.Components;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using ImaPay.Entity.Dtos;


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

[ApiController]
[Microsoft.AspNetCore.Mvc.Route("[Controller]")]
public class UsuarioController : ControllerBase
{
    private IMapper _mapper;
    private UserManager<Usuario> _userManager;

    public UsuarioController(IMapper mapper, UserManager<Usuario> userManager)
    {
        _mapper = mapper;
        _userManager = userManager;
    }

    [HttpPost]
    public async Task<IActionResult> CadastraUsuario
        (CreateUsuarioDto dto)
    {
        Usuario usuario = _mapper.Map<Usuario>(dto);

        IdentityResult resultado = await _userManager.CreateAsync(usuario, dto.Password);

        if (resultado.Succeeded) return Ok("Usuário cadastrado!");

        throw new ApplicationException("Falha ao cadastrar usuario!");
    }
}