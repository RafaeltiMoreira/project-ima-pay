using System.ComponentModel.DataAnnotations;

namespace ImaPay.Entity.Dtos;

public class UsuarioRegistroDTO
{
    [Required]
    public string Username { get; set; }
    [Required]
    public DateTime DataNascimento { get; set; }
    [Required]
    public string CPF { get; set; }
    [Required]
    [DataType(DataType.Password)]
    public string Password { get; set; }
    [Required]
    [Compare("Password")]
    public string RePassword { get; set; }
}

