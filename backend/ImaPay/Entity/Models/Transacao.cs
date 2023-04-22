using System.ComponentModel.DataAnnotations;

namespace ImaPay.Entity.Models;

public class Transacao
{
    [Key]
    [Required]
    public int Id { get; set; }
    [Required]
    public int RemetenteId { get; set; }
    [Required]
    public int DestinatarioId { get; set; }
    [Required]
    public decimal Valor { get; set; }
    public DateTime Data { get; set; } = DateTime.Now;
    public Usuario Usuario { get; set; }
}