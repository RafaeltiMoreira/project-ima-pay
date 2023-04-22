import { MagnifyingGlass } from "phosphor-react";

import { ViewHistoryContainer } from "./styles";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { TableTransfers } from "../../components/TableTransfers";
import { useContext } from "react";
import { TransfersContextDp } from "../../contexts/TransfersContextDp";
import { TransfersContextPix } from "../../contexts/TransfersContextPix";

const viewFormSchemaDp = z.object({
    query: z.string(),
})

const viewFormSchemaPix = z.object({
    query: z.string(),
})

type ViewFormInputsDp = z.infer<typeof viewFormSchemaDp>;
type ViewFormInputsPix = z.infer<typeof viewFormSchemaPix>;

export function ViewHistory() {
    const { fetchTransfersDp } = useContext(TransfersContextDp);
    const { fetchTransfersPix } = useContext(TransfersContextPix);

    const {
        register,
        handleSubmit,
        formState: { isSubmitting },
    } = useForm<ViewFormInputsDp | ViewFormInputsPix>({
        resolver: zodResolver(viewFormSchemaDp && viewFormSchemaPix),
    });

    async function handleViewTransfersDp(data: ViewFormInputsDp) {
        await fetchTransfersDp(data.query);
    }

    async function handleViewTransfersPix(data: ViewFormInputsPix) {
        await fetchTransfersPix(data.query);
    }

    async function handleViewTransfers(data: ViewFormInputsDp | ViewFormInputsPix) {
        if ("query" in data) {
            await handleViewTransfersDp(data);
        } else {
            await handleViewTransfersPix(data);
        }
    }
    return (
        <div>

            <ViewHistoryContainer onSubmit={handleSubmit(handleViewTransfers)}>

                <input
                    type="text"
                    placeholder="Histórico de transferências"
                    {...register("query")}
                />

                <button type="submit" disabled={isSubmitting} title="Buscar histórico de transferências">
                    <MagnifyingGlass size={32} />
                    Visualizar
                </button>

            </ViewHistoryContainer>
            <TableTransfers />
        </div>
    );
}
