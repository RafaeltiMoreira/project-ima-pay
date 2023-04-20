using FluentValidation;
using ImaPay.Entity.Models;

namespace ImaPay.Validador;

public class ValidandoEndereco : AbstractValidator<Endereco>
{
    public ValidandoEndereco()
    {
        RuleFor(endereco => endereco.Rua)
            .NotEmpty().WithMessage("O campo Rua é obrigatório")
            .Length(3, 100).WithMessage("O campo Rua deve ter entre 3 e 100 caracteres");

        RuleFor(endereco => endereco.Numero)
            .NotEmpty().WithMessage("O campo Número é obrigatório")
            .Length(1, 10).WithMessage("O campo Número deve ter entre 1 e 10 caracteres");

        RuleFor(endereco => endereco.Bairro)
            .NotEmpty().WithMessage("O campo Bairro é obrigatório")
            .Length(3, 50).WithMessage("O campo Bairro deve ter entre 3 e 50 caracteres");

        RuleFor(endereco => endereco.Cidade)
            .NotEmpty().WithMessage("O campo Cidade é obrigatório")
            .Length(3, 50).WithMessage("O campo Cidade deve ter entre 3 e 50 caracteres");

        RuleFor(endereco => endereco.Estado)
            .NotEmpty().WithMessage("O campo Estado é obrigatório")
            .Length(2, 2).WithMessage("O campo Estado deve ter 2 caracteres");

        RuleFor(endereco => endereco.Cep)
            .NotEmpty().WithMessage("O campo CEP é obrigatório")
            .Matches(@"^\d{5}-\d{3}$").WithMessage("O campo CEP deve estar no formato 99999-999");
    }
}
