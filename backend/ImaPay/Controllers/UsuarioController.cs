using ImaPay.Data;
using ImaPay.Entity.Dtos;
using ImaPay.Entity.Models;
using ImaPay.Helpers;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
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
    public IActionResult Register([FromBody] Usuario usuario)
    {
        return Ok();
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

        var token = GerarToken(usuario);

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