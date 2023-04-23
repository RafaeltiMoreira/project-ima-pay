using ImaPay.Entity.Models;

namespace ImaPay.Entity.Dtos;

public class UsuarioLogadoDTO
{
    public string Nome { get; set; }
    public string CPF { get; set; }
    public string Email { get; set; }
    public string Senha { get; set; }
    public decimal Saldo { get; set; }
    public string Agencia { get; set; }
    public string Conta { get; set; }
    public List<Transacao> Transacoes { get; set; }
    public virtual Endereco Endereco { get; set; }
}
