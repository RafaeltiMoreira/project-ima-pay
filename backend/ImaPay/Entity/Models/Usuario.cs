﻿using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;

namespace ImaPay.Entity.Models;

public class Usuario : IdentityUser
{
    [Key]
    [Required]
    public int ID { get; set; }
    [Required]
    public string Nome { get; set; }
    [Required]
    public string CPF { get; set; }
    [Required]
    public string Email { get; set; }
    [Required]
    public string Senha { get; set; }
    public decimal Saldo { get; set; }
    public string Agencia { get; set; }
    public string Conta { get; set; }
    public List<Transacao> Transacoes { get; set; }
    public int EnderecoID { get; set; }
    public virtual Endereco Endereco { get; set; }
}
