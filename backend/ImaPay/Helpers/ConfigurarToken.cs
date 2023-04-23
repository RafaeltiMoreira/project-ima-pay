using ImaPay.Entity.Models;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;

namespace ImaPay.Helpers;

public class ConfigurarToken
{
    public static byte[] SecretKey = GenerateSecretKey();

    public static string GerarToken(Usuario usuario)
    {
        var tokenHandler = new JwtSecurityTokenHandler();
        var tokenKey = SecretKey;

        var claims = new List<Claim>
        {
            new Claim(ClaimTypes.NameIdentifier, usuario.Id.ToString()),
            new Claim(ClaimTypes.Email, usuario.Email)
        };

        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(claims),
            Expires = DateTime.UtcNow.AddDays(1),
            SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(tokenKey), SecurityAlgorithms.HmacSha256Signature)
        };

        var token = tokenHandler.WriteToken(tokenHandler.CreateToken(tokenDescriptor));

        return token;
    }

    private static byte[] GenerateSecretKey()
    {
        using var randomNumberGenerator = new RNGCryptoServiceProvider();
        var key = new byte[256];
        randomNumberGenerator.GetBytes(key);

        return key;
    }
}
