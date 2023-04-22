using ImaPay.Data;
using ImaPay.Entity.Dtos;
using ImaPay.Entity.Models;
using ImaPay.Helpers;
using ImaPay.Validador;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Net;
using System.Security.Claims;
using System.Text;

namespace ImaPay.Controllers;

[ApiController]
[Route("usuarios")]
public class UsuarioController : ControllerBase
{
    private SharnoContextDb _context;

    public UsuarioController(SharnoContextDb context)
    {
        _context = context;
    }

    [HttpPost]
    [Route("register")]
    public IActionResult Register([FromBody] CadastroUsuarioDTO cadastroUsuario)
    {
        try
        {
            var novoUsuario = new Usuario
            {
                Nome = cadastroUsuario.Nome,
                CPF = cadastroUsuario.CPF,
                Email = cadastroUsuario.Email,
                Senha = cadastroUsuario.Senha,
                Celular = cadastroUsuario.Celular
            };
            _context.Usuarios.Add(novoUsuario);
            _context.SaveChanges();
            return Ok(novoUsuario);
        }
        catch (DbUpdateException ex)
        {
            return BadRequest("Erro ao cadastrar usuário: " + ex.Message);
        }
        catch (Exception ex)
        {
            return BadRequest("Erro ao cadastrar usuário: " + ex.Message);
        }
    }

    [HttpPost]
    [Route("login")]
    public IActionResult Login([FromBody] UsuarioLoginDTO login)
    {
        var usuario = _context.Usuarios.FirstOrDefault(usuario => usuario.CPF == login.CPF);
        var usuarioNaoCadastrado = (usuario == null);
        var mensagemDeErro = StatusCode(
            statusCode: (int)HttpStatusCode.Unauthorized,
            value: new 
            {
                Message = $"Usuário ou Senha incorreto.",
                Moment = DateTime.Now
            });

        if (usuarioNaoCadastrado) return mensagemDeErro;

        var senhaIncorreta = !BCrypt.Net.BCrypt.Verify(login.Senha, usuario.Senha);

        if (senhaIncorreta) return mensagemDeErro;

        var token = ConfigurarToken.GerarToken(usuario);

        return Ok(new { token });
    }


    //Não consegui pegar o Token, mas sei que usa o TokenHandler.ReadToken pra transformar de voltar num usuario.
    
    [HttpPost]
    [Route("usuarioLogado.Nome")]
    public IActionResult Loged([FromBody] UsuarioLogadoDTO usuarioLogado ) {

        var usuario = _context.Usuarios.FirstOrDefault(usuario => usuario.Nome == usuarioLogado.Nome);
        return Ok(new { usuario });
    }
}