import {
    ContentPix,
    Overlay,
    TransfersValueButtonPix,
    TransfersValuePix,
} from "./styles";
import { MdOutlinePayments, MdPix } from "react-icons/md";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useContextSelector } from "use-context-selector"
import { TransfersContextPix } from "../../contexts/TransfersContextPixDp";
import * as Dialog from '@radix-ui/react-dialog'
import { CloseButton, LegendTitle, TransfersValueButtonDp } from "../TransfersDp/styles";

const newTransfersFormSchema = z.object({
    pix: z.string(),
    price: z.number(),
    description: z.string(),
    category: z.string(),
    type: z.enum(["input", "output"]),
    password: z.string(),
});

type NewTransfersFormInputs = z.infer<typeof newTransfersFormSchema>;

export function TransfersPix() {
    const createTransfersPix = useContextSelector(TransfersContextPix, (context) => {
        return context.createTransfersPix
    });

    const {
        control,
        register,
        handleSubmit,
        formState: { isSubmitting },
        reset,
    } = useForm<NewTransfersFormInputs>({
        resolver: zodResolver(newTransfersFormSchema),
    });

    async function handleCreateNewTransfers(data: NewTransfersFormInputs) {
        const { pix, price, description, category, type, password } = data;

        await createTransfersPix({
            pix,
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

            <ContentPix>
                <LegendTitle>
                    PIX
                    <MdPix size={32} />
                </LegendTitle>

                <CloseButton>
                    Fechar
                </CloseButton>

                <form onSubmit={handleSubmit(handleCreateNewTransfers)}>
                    <input
                        className="input-pix"
                        type="text"
                        placeholder="Chave PIX"
                        required
                        {...register("pix")}
                    />
                    <input
                        className="input-valor"
                        type="number"
                        placeholder="Valor R$"
                        required
                        {...register("price", { valueAsNumber: true })}
                    />
                    <input
                        className="input-desc"
                        type="text"
                        placeholder="Descrição"
                        required
                        {...register("description")}
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
                                <TransfersValuePix onValueChange={field.onChange} value={field.value}>
                                    <TransfersValueButtonPix variant="input" value="input">
                                        <MdOutlinePayments size={26} />
                                        Receber
                                    </TransfersValueButtonPix>

                                    <TransfersValueButtonPix variant="output" value="output">
                                        <MdOutlinePayments size={26} />
                                        Transferir
                                    </TransfersValueButtonPix>
                                </TransfersValuePix>
                            );
                        }}
                    />
                    <button type="submit" title="Confirmar" disabled={isSubmitting}>
                        Confirmar
                    </button>
                </form>
            </ContentPix>
        </Dialog.Portal>
    );
}
