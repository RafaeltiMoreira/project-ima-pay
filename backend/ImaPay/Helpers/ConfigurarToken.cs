using ImaPay.Entity.Models;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace ImaPay.Helpers;

public class ConfigurarToken
{
    private static string _secretKey = "@&&N3>+Dl}'HWY4t?/I2gk}TU'XoSxj[Fy1^UX+;CJpd$eao[%kAO~m%ba9&oG:<(5cRQlq$q@Lz2QL$%'.o:jij<%,y8axn*A3?IFty*i4<;K@M{_I#NjA2%{4DXLLNTLOw*5c(Z]}5|h%Ri,V_k>YeFSLr26}A6%tpBz~G@E&E')@0:aI0Lpg=OCPrm7PfR5nA,??r5M8&s*7i3E@hZ+&H@cj~*x/VpwoMugy[DE_9.N*Xee5*o?0!6~V^>a_";

    public static string GerarToken(Usuario usuario)
    {
        var tokenHandler = new JwtSecurityTokenHandler();
        var tokenKey = Encoding.UTF8.GetBytes(_secretKey);

        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(new Claim[]
            {
            new Claim(ClaimTypes.NameIdentifier, usuario.Id),
            new Claim(ClaimTypes.Email, usuario.Email)
            }),
            Expires = DateTime.UtcNow.AddHours(10),
            SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(tokenKey), SecurityAlgorithms.HmacSha256Signature)
        };

        var token = tokenHandler.CreateToken(tokenDescriptor);

        return tokenHandler.WriteToken(token);
    }
}
