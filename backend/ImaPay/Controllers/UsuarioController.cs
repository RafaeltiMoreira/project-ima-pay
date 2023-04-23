using AutoMapper;
using ImaPay.Data;
using ImaPay.Entity.Dtos;
using ImaPay.Entity.Models;
using ImaPay.Helpers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
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
    private IMapper _mapper;
    private UserManager<Usuario> _userManager;

    public UsuarioController(SharnoContextDb context, IMapper mapper, UserManager<Usuario> userManager)
    {
        _context = context;
        _mapper = mapper;
        _userManager = userManager;
    }

    [AllowAnonymous]
    [HttpPost]
    [Route("register")]
    public async Task<IActionResult> Register([FromBody] UsuarioRegistroDTO register)
    {
        var usuario = _mapper.Map<Usuario>(register);

        IdentityResult resultado = await _userManager.CreateAsync(usuario, register.Password);

        if (resultado.Succeeded)
        {
            _context.Usuarios.Add(usuario);
            _context.SaveChanges();
            return Ok("Usuário cadastrado!");
        }

        throw new ApplicationException("Falha ao cadastrar usuario!");
    }

    [AllowAnonymous]
    [HttpPost]
    [Route("login")]
    public async Task<IActionResult> Login([FromBody] UsuarioLoginDTO login)
    {
        var usuario = await _context.Usuarios.FirstOrDefaultAsync(usuario => usuario.CPF == login.CPF);
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

            var usuario = await _context.Usuarios.FirstOrDefaultAsync(usuario => usuario.Id.ToString() == tokenUsuarioId);

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