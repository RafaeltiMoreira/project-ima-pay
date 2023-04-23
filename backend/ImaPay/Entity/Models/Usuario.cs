using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;

namespace ImaPay.Entity.Models;

public class Usuario : IdentityUser
{
    [Key]
    [Required]
    public string CPF { get; set; }
    [Required]
    public int ID { get; set; }
    [Required]
    public string Nome { get; set; }
    [Required]
    public string Celular { get; set; }
    [Required]
    public string Email { get; set; }
    [Required]
    public string Senha { get; set; }

    public DateTime DataNascimento { get; set; }
    public Usuario() : base()
    {

    }
}
