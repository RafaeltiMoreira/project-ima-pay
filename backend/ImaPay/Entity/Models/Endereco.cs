using System.ComponentModel.DataAnnotations;

namespace ImaPay.Entity.Models;

public class Endereco
{
    [Key]
    [Required]
    public int Id { get; set; }
    [Required]
    public string Cep { get; set; }
    [Required]
    public string Estado { get; set; }
    [Required]
    public string Cidade { get; set; }
    [Required]
    public string Bairro { get; set; }
    [Required]
    public string Rua { get; set; }
    [Required]
    public string Numero { get; set; }
    public Usuario Usuario { get; set; }
}
