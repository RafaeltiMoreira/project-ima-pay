namespace System.Models
{
    public class Usuario
    {

        public int Id { get; set; }
        public string Nome { get; set; }
        public string Sobrenome { get; set; }
        public string Email { get; set; }
        public string Senha { get; set; }
       
        public string Agencia { get{ return "99999"; } }
        public string Conta { get; set; }
        public decimal Saldo { get; set; }
        public string Cpf { get; set; }

        public Endereco Endereco { get; set; }
    }
}
