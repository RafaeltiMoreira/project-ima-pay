import { TableContainer, TableContent, ValueTransfers } from "./styles";
import { dateFormatter, valueFormatter } from "../../utils/formatter";
import { TransfersContextDp, TransfersContextPix } from "../../contexts/TransfersContextPixDp";
import { useContextSelector } from "use-context-selector"

export function TableTransfers() {

    const transfersdp = useContextSelector(TransfersContextDp, (context) => {
        return context.transfersdp
    });

    const transferspix = useContextSelector(TransfersContextPix, (context) => {
        return context.transferspix
    });

    const transfersList = [...transferspix, ...transfersdp];

    return (
        <div>

            <TableContainer>
                <TableContent>
                    <tbody>
                        {transfersList.map(transfers => {
                            return (
                                <tr key={transfers.id}>
                                    <td width="40%">{transfers.description}</td>
                                    <td>
                                        <ValueTransfers variant={transfers.type}>
                                            {transfers.type === "output" && "- "}
                                            {valueFormatter(transfers.price)}
                                        </ValueTransfers>
                                    </td>
                                    <td>{transfers.category}</td>
                                    <td>{dateFormatter.format(new Date(transfers.createdAt))}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </TableContent>
            </TableContainer>

        </div>
    )
}
