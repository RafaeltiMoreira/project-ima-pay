using FluentValidation;
using ImaPay.Entity.Models;

namespace ImaPay.Validador
{
    public class ValidandoUsuario : AbstractValidator<Usuario>
    {

        public ValidandoUsuario()
        {
            RuleFor(usuario => usuario.Nome)
                .NotEmpty().WithMessage("O campo Nome é obrigatório")
                .Length(3, 100).WithMessage("O campo Nome deve ter entre 3 e 100 caracteres");

            RuleFor(usuario => usuario.Email)
                .NotEmpty().WithMessage("O campo Email é obrigatório")
                .EmailAddress().WithMessage("O campo Email deve ser um endereço de email válido");

            RuleFor(usuario => usuario.Senha)
                .NotEmpty().WithMessage("O campo Senha é obrigatório")
                .Length(6, 20).WithMessage("O campo Senha deve ter entre 6 e 20 caracteres");

            RuleFor(usuario => usuario.Endereco)
                .NotNull().WithMessage("O endereço é obrigatório");
        }
    }
}
