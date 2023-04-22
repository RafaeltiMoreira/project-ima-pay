using System.ComponentModel.DataAnnotations;

namespace ImaPay.Entity.Dtos
{
    public class CadastroUsuarioDTO
    {
        public string Nome { get; set; }
        public string CPF { get; set; }
        public string Email { get; set; }
        public string Senha { get; set; }
        public string Celular { get; set; }
    }
}
