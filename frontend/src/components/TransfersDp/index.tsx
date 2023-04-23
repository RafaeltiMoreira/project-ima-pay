import {
    CloseButton,
    ContentDp,
    LegendTitle,
    Overlay,
    TransfersValueButtonDp,
    TransfersValueDp,
} from "./styles";
import { ArrowsLeftRight, Wallet } from "phosphor-react";
import { MdOutlinePayments } from "react-icons/md";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import * as Dialog from '@radix-ui/react-dialog'
import { useContextSelector } from "use-context-selector"
import { TransfersContextDp } from "../../contexts/TransfersContextPixDp";

const newTransfersDpFormSchema = z.object({
    name: z.string(),
    cpf: z.string(),
    agency: z.string(),
    account: z.string(),
    price: z.number(),
    description: z.string(),
    category: z.string(),
    type: z.enum(["input", "output"]),
    password: z.string(),
});

type NewTransfersDpFormInputs = z.infer<typeof newTransfersDpFormSchema>;

export function TransfersDp() {
    const createTransfersDp = useContextSelector(TransfersContextDp, (context) => {
        return context.createTransfersDp
    });

    const {
        control,
        register,
        handleSubmit,
        formState: { isSubmitting },
        reset,
    } = useForm<NewTransfersDpFormInputs>({
        resolver: zodResolver(newTransfersDpFormSchema),
    });

    async function handleCreateNewTransfersDp(data: NewTransfersDpFormInputs) {
        const {
            name,
            cpf,
            agency,
            account,
            price,
            description,
            category,
            type,
            password,
        } = data;

        await createTransfersDp({
            name,
            cpf,
            agency,
            account,
            price,
            description,
            category,
            type,
            password,
        });

        reset();
    }

    return (
        <Dialog.Portal>
            <Overlay />

            <ContentDp>
                <LegendTitle>
                    Transferência
                    <ArrowsLeftRight size={32} />
                </LegendTitle>

                <CloseButton>
                    Fechar
                </CloseButton>

                <form onSubmit={handleSubmit(handleCreateNewTransfersDp)}>
                    <input
                        className="input-name"
                        type="text"
                        placeholder="Digite o nome"
                        required
                        {...register("name")}
                    />
                    <input
                        className="input-cpf"
                        type="text"
                        placeholder="Digite o CPF"
                        required
                        {...register("cpf")}
                    />
                    <input
                        className="input-agency"
                        type="text"
                        placeholder="Nº da agência"
                        required
                        {...register("agency")}
                    />
                    <input
                        className="input-acc"
                        type="text"
                        placeholder="Nº da conta"
                        required
                        {...register("account")}
                    />
                    <input
                        className="input-desc"
                        type="text"
                        placeholder="Descrição"
                        required
                        {...register("description")}
                    />
                    <input
                        className="input-number"
                        type="number"
                        placeholder="Valor R$"
                        required
                        {...register("price", { valueAsNumber: true })}
                    />
                    <input
                        className="input-cat"
                        type="text"
                        placeholder="Categoria"
                        autoComplete="true"
                        required
                        {...register("category")}
                    />
                    <input
                        className="input-senha"
                        type="password"
                        placeholder="Digite sua senha"
                        autoComplete="current-password"
                        required
                        {...register("password")}
                    />

                    <Controller
                        control={control}
                        name="type"
                        render={({ field }) => {
                            return (
                                <TransfersValueDp onValueChange={field.onChange} value={field.value}>
                                    <TransfersValueButtonDp variant="input" value="input">
                                        <MdOutlinePayments size={24} />
                                        Receber
                                    </TransfersValueButtonDp>

                                    <TransfersValueButtonDp variant="output" value="output">
                                        <MdOutlinePayments size={24} />
                                        Pagar
                                    </TransfersValueButtonDp>
                                </TransfersValueDp>
                            );
                        }}

                    />
                    <button type="submit" title="Confirmar" disabled={isSubmitting}>
                        Confirmar
                    </button>

                </form>
            </ContentDp>
        </Dialog.Portal>

    );
}


