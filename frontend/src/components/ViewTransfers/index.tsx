import { CaretCircleLeft, MagnifyingGlass } from "phosphor-react";
import { NavLink } from "react-router-dom";
import { ButtonReturn, ViewTransfersContainer } from "./styles";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const viewFormSchema = z.object({
    query: z.string(),
})

type ViewFormInputs = z.infer<typeof viewFormSchema>;

export function ViewTransfers() {
    const {
        register,
        handleSubmit,
        formState: { isSubmitting }
    } = useForm<ViewFormInputs>({
        resolver: zodResolver(viewFormSchema),
    })

    async function handleViewTransfers(data: ViewFormInputs) {
        await new Promise(resolve => setTimeout(resolve, 1000));
        console.log(data);
    }

    return (
        <div>
            <ViewTransfersContainer onSubmit={handleSubmit(handleViewTransfers)}>

                <NavLink to="/transfers/:userId" title="Voltar para tela de transferências">
                    <ButtonReturn className="btn-back">
                        <CaretCircleLeft className="btn-back" size={32} />
                    </ButtonReturn>
                </NavLink>

                <input
                    type="text"
                    placeholder="Histórico de transferências"
                    {...register("query")}
                />

                <button type="submit" disabled={isSubmitting} title="Buscar histórico de transferências">
                    <MagnifyingGlass size={32} />
                    Visualizar
                </button>

            </ViewTransfersContainer>

        </div>
    );
}
