using System.Data;
using System.Dtos;
using System.Helpers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Net;
using System.Security.Claims;
using ImaPay.Dtos;
using System.Implementacoes.InterManage;
using System.Models;

namespace System.Controllers;

[ApiController]
[Route("usuarios")]
public class UsuarioController : ControllerBase
{
    private readonly IImaPayService _imaPayService;

    public UsuarioController(IImaPayService imaPayService)
    {
        _imaPayService = imaPayService;
    }

    [HttpPost]
    [Route("register")]
    public async Task<IActionResult> RegisterUserAsync(UsuarioEnderecoDTO dto)
    {
        var usuario = await _imaPayService.RegisterUserAsync(dto);
        return Ok(usuario);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetUserByIdAsync(int id)
    {
        var usuario = await _imaPayService.GetUserByIdAsync(id);
        if (usuario == null) return NotFound();
        return Ok(usuario);
    }

    [HttpGet("email/{email}")]
    public async Task<IActionResult> GetUserByEmailAsync(string email)
    {
        var usuario = await _imaPayService.GetUserByEmailAsync(email);
        if (usuario == null) return NotFound();
        return Ok(usuario);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> RemoverUsuario(int id)
    {
        await _imaPayService.DeleteUsuarioAsync(id);
        return NoContent();
    }

    [AllowAnonymous]
    [HttpPost]
    [Route("login")]
    public async Task<IActionResult> Login([FromBody] UsuarioLoginDTO login)
    {
        var usuario = await _imaPayService.LoginAsync(login);
        return Ok(usuario);
    }

    [Authorize]
    [HttpGet]
    [Route("info-usuario")]
    public async Task<IActionResult> GetInformacaoUsuario()
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

            var usuario = await _imaPayService.Usuario.FirstOrDefaultAsync(usuario => usuario.Id.ToString() == tokenUsuarioId);

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