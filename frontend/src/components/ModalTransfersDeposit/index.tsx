import * as Dialog from "@radix-ui/react-dialog";
import {
    Close,
    Content,
    Overlay,
    Title,
    TransfersValueButtonDp,
    TransfersValueDp,
} from "./styles";
import { Bank, X } from "phosphor-react";
import { MdOutlinePayments } from "react-icons/md";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { TransfersContextDp } from "../../contexts/TransfersContextDp";
import { useContext } from "react";

const newTransfersDpFormSchema = z.object({
    name: z.string(),
    cpf: z.string(),
    agency: z.string(),
    account: z.string(),
    value: z.number(),
    description: z.string(),
    category: z.string(),
    type: z.enum(["input", "output"]),
    password: z.string(),
    query: z.string()
});

type NewTransfersDpFormInputs = z.infer<typeof newTransfersDpFormSchema>;

export function ModalTransfersDeposit() {
    const { createTransfersDp } = useContext(TransfersContextDp)

    const {
        control,
        register,
        handleSubmit,
        formState: { isSubmitting },
        reset,
    } = useForm<NewTransfersDpFormInputs>({
        resolver: zodResolver(newTransfersDpFormSchema),
        defaultValues: {
            type: "input",
        },
    });

    async function handleCreateNewTransfersDp(data: NewTransfersDpFormInputs) {
        const { name, cpf, agency, account, value, description, category, type, password } = data;

        await createTransfersDp({
            name,
            cpf,
            agency,
            account,
            value,
            description,
            category,
            type,
            password
        })

        reset();
    }

    return (
        <Dialog.Portal>
            <Overlay />
            <Content>
                <Title>
                    Transferência
                    <Bank size={32} />
                </Title>

                <form onSubmit={handleSubmit(handleCreateNewTransfersDp)}>
                    <input
                        type="name"
                        placeholder="Digite o nome"
                        required
                        {...register("name")}
                    />
                    <input
                        type="text"
                        placeholder="Digite o CPF"
                        required
                        {...register("cpf")}
                    />
                    <input
                        type="text"
                        placeholder="Nº da agência"
                        required
                        {...register("agency")}
                    />
                    <input
                        type="text"
                        placeholder="Nº da conta"
                        required
                        {...register("account")}
                    />
                    <input
                        type="value"
                        placeholder="Valor R$"
                        required
                        {...register("value")}
                    />
                    <input
                        type="text"
                        placeholder="Descrição"
                        required
                        {...register("description")}
                    />
                    <input
                        type="text"
                        placeholder="Categoria"
                        required
                        {...register("category")}
                    />
                    <input
                        type="password"
                        placeholder="Digite sua senha"
                        required
                        {...register("password")}
                    />

                    <Controller
                        control={control}
                        name="type"
                        render={({ field }) => {
                            return (
                                <TransfersValueDp
                                    onValueChange={field.onChange}
                                    value={field.value}
                                >
                                    <TransfersValueButtonDp variant="input" value="input">
                                        <MdOutlinePayments size={24} />
                                        Receber
                                    </TransfersValueButtonDp>

                                    <TransfersValueButtonDp variant="output" value="output">
                                        <MdOutlinePayments size={24} />
                                        Transferir
                                    </TransfersValueButtonDp>
                                </TransfersValueDp>
                            );
                        }}
                    />
                    <button type="submit" disabled={isSubmitting}>Enviar</button>
                </form>

                <Close>
                    <X size={24} />
                </Close>
            </Content>
        </Dialog.Portal>
    );
}
