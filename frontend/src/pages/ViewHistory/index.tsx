import { useContextSelector } from "use-context-selector";
import { ViewFormContainer } from "./styles";
import {
    TransfersContextDp,
    TransfersContextPix,
} from "../../contexts/TransfersContextPixDp";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { MagnifyingGlass } from "phosphor-react";
import { TableTransfers } from "../../components/TableTransfers";
import { memo } from "react";

const viewFormSchema = z.object({
    query: z.string(),
});

type ViewFormInputs = z.infer<typeof viewFormSchema>;

function ViewHistoryPage() {
    const fetchTransfersDp = useContextSelector(TransfersContextDp, (context) => {
        return context.fetchTransfersDp;
    });

    const fetchTransfersPix = useContextSelector(
        TransfersContextPix,
        (context) => {
            return context.fetchTransfersPix;
        }
    );

    const {
        register,
        handleSubmit,
        formState: { isSubmitting },
    } = useForm<ViewFormInputs>({
        resolver: zodResolver(viewFormSchema),
    });

    async function handleViewTransfersDp(data: ViewFormInputs) {
        return fetchTransfersDp(data.query);
    }

    async function handleViewTransfersPix(data: ViewFormInputs) {
        return fetchTransfersPix(data.query);
    }

    async function handleViewTransfers(data: ViewFormInputs) {
        let result;
        if (data.query) {
            result = await handleViewTransfersDp(data);
        } else {
            result = await handleViewTransfersPix(data);
        }
        console.log(data)
        return result;
    }

    return (
        <div>
            <ViewFormContainer onSubmit={handleSubmit(handleViewTransfers)}>
                <input
                    className="input-view"
                    type="text"
                    placeholder="Histórico de transferências"
                    {...register("query")}
                />

                <button
                    className="button-view"
                    type="submit"
                    disabled={isSubmitting}
                    title="Buscar histórico de transferências"
                >
                    <MagnifyingGlass size={28} />
                    Visualizar
                </button>
            </ViewFormContainer>
            <TableTransfers />
        </div>
    );
}

export const ViewHistory = memo(ViewHistoryPage);

