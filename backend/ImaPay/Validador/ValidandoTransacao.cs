﻿using FluentValidation;
using System.Models;

namespace ImaPay.Validador;

public class ValidandoTransacao : AbstractValidator<Transferencia>
{
    public ValidandoTransacao()
    {
        RuleFor(transacao => transacao.Valor)
            .NotEmpty().WithMessage("O campo Valor é obrigatório")
            .GreaterThan(0).WithMessage("O campo Valor deve ser maior que zero");
    }
}
