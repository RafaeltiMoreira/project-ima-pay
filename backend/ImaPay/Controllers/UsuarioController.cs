using ImaPay.Data;
using ImaPay.Entity.Dtos;
using ImaPay.Helpers;
using Microsoft.AspNetCore.Mvc;
using System.Net;

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
}