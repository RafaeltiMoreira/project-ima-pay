import * as Dialog from "@radix-ui/react-dialog";
import {
    Close,
    Content,
    Overlay,
    Title,
    TransfersValuePi,
    TransfersValueButtonPi,
} from "./styles";
import { MdOutlinePayments, MdPix } from "react-icons/md";
import { X } from "phosphor-react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useContext } from "react";
import { TransfersContextPix } from "../../contexts/TransfersContextPix";

const newTransfersFormSchema = z.object({
    pix: z.string(),
    value: z.number(),
    description: z.string(),
    category: z.string(),
    type: z.enum(["input", "output"]),
    password: z.string(),
    query: z.string()
});

type NewTransfersFormInputs = z.infer<typeof newTransfersFormSchema>;

export function ModalTransfersPix() {
    const { createTransfersPix } = useContext(TransfersContextPix)

    const {
        control,
        register,
        handleSubmit,
        formState: { isSubmitting },
        reset,
    } = useForm<NewTransfersFormInputs>({
        resolver: zodResolver(newTransfersFormSchema),
        defaultValues: {
            type: "input"
        }
    });

    async function handleCreateNewTransfers(data: NewTransfersFormInputs) {
        const { pix, value, description, category, type, password } = data;

        await createTransfersPix({
            pix,
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
                    PIX
                    <MdPix size={32} />
                </Title>

                <form onSubmit={handleSubmit(handleCreateNewTransfers)}>
                    <input
                        type="text"
                        placeholder="Chave PIX"
                        required
                        {...register("pix")}
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
                                <TransfersValuePi onValueChange={field.onChange} value={field.value}>
                                    <TransfersValueButtonPi variant="input" value="input">
                                        <MdOutlinePayments size={24} />
                                        Receber
                                    </TransfersValueButtonPi>

                                    <TransfersValueButtonPi variant="output" value="output">
                                        <MdOutlinePayments size={24} />
                                        Transferir
                                    </TransfersValueButtonPi>
                                </TransfersValuePi>
                            );
                        }}
                    />

                    <button type="submit" disabled={isSubmitting}>
                        Enviar
                    </button>
                </form>

                <Close>
                    <X size={24} />
                </Close>
            </Content>
        </Dialog.Portal>
    );
}
