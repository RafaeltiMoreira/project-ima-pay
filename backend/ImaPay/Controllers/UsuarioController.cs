using ImaPay.Data;
using ImaPay.Entity.Dtos;
using ImaPay.Entity.Models;
using ImaPay.Helpers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Net;
using System.Security.Claims;

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
            statusCode: (int)HttpStatusCode.BadRequest,
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

    [Authorize]
    [HttpGet]
    [Route("info-usuario")]
    public IActionResult GetInformacaoUsuario() 
    {
        var token = HttpContext.Request.Headers["Authorization"].ToString().Replace("Bearer ", "");

        var tokenHandler = new JwtSecurityTokenHandler();

        try
        {
            var claimsPrincipal = tokenHandler.ValidateToken(token, new TokenValidationParameters
            {
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(ConfigurarToken.SecretKey),
                ValidateIssuer = false,
                ValidateAudience = false
            }, out var validatedToken);

            var tokenUsuarioId = claimsPrincipal.FindFirst(ClaimTypes.NameIdentifier).Value;

            var usuario = _context.Usuarios.FirstOrDefault(usuario => usuario.Id.ToString() == tokenUsuarioId);

            return Ok(usuario);
        }
        catch (Exception exception)
        {
            return StatusCode(
                statusCode: (int)HttpStatusCode.InternalServerError,
                value: new
                {
                    Message = "Ocorreu um erro ao processar a requisição.",
                    Moment = DateTime.Now
                });
        }
    }
}