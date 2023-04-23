using ImaPay.Entity.Models;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;

namespace ImaPay.Helpers;

public class ConfigurarToken
{
    public static byte[] SecretKey = GenerateSecretKey();

    private static byte[] GenerateSecretKey()
    {
        const int keySize = 256;

        using var randomNumberGenerator = new RNGCryptoServiceProvider();
        var key = new byte[keySize / 8];
        randomNumberGenerator.GetBytes(key);

        return key;
    }

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
            Expires = DateTime.UtcNow.AddHours(10),
            SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(tokenKey), SecurityAlgorithms.HmacSha256Signature)
        };

        var token = tokenHandler.CreateToken(tokenDescriptor);

        return tokenHandler.WriteToken(token);
    }
}
