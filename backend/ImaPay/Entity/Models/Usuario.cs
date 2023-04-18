using System.ComponentModel.DataAnnotations.Schema;

namespace ImaPay.Entity.Models
{
    public class Usuario
    {
        public int Id { get; set; }
        public string Nome { get; set; }
        public string Cpf { get; set; }
        public string Email { get; set; }
        public string Senha { get; set; }
        public string Celular { get; set; }
        public double Saldo { get; set; }
        public string Agencia { get; set; }
        public string Conta { get; set; }
        public Endereco Endereco { get; set; }
    }
}
