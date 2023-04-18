import { ViewTransfers } from "../../components/ViewTransfers";
import { TableTransfers } from "../../components/TableTransfers";
import { TransfersProviderDp } from "../../contexts/TransfersContextDp";
import { TransfersProvider } from "../../contexts/TransfersContextPix";

export function SearchTransfers() {
    return (
        <div>
            <TransfersProvider>
                <TransfersProviderDp>
                    <ViewTransfers />
                    <TableTransfers />
                </TransfersProviderDp>
            </TransfersProvider>
        </div>
    );
}
