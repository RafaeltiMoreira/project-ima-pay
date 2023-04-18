import { TodoTransfers } from "../../components/TodoTransfers";
import { TransfersProviderDp } from "../../contexts/TransfersContextDp";
import { TransfersProvider } from "../../contexts/TransfersContextPix";

export function Transfers() {

    return (
        <div>
            <TransfersProvider>
                <TransfersProviderDp>
                    <TodoTransfers />

                </TransfersProviderDp>
            </TransfersProvider>
        </div>
    )
}