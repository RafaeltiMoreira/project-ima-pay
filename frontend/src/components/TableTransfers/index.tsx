import { useContext } from "react";
import { TransfersContextPix } from "../../contexts/TransfersContextPix";
import { TransfersContextDp } from "../../contexts/TransfersContextDp";
import { TableContainer, TableContent, ValueTransfers } from "./styles";
import { MdPix } from "react-icons/md"
import { dateFormatter, valueFormatter } from "../../utils/formatter";

export function TableTransfers() {
    const { transferspix } = useContext(TransfersContextPix);
    const { transfersdp } = useContext(TransfersContextDp);

    return (
        <div>

            <TableContainer>
                <TableContent>
                    <tbody>
                        {transferspix.map(transfers => {
                            return (
                                <tr key={transfers.id}>
                                    <td width="30%">{transfers.description}</td>
                                    <td>
                                        <ValueTransfers variant={transfers.type}>
                                            {transfers.type === "output" && "- "}
                                            {valueFormatter(transfers.value)}
                                        </ValueTransfers>
                                    </td>
                                    <td>{transfers.category}</td>
                                    <td>{dateFormatter.format(new Date(transfers.createdAt))}</td>
                                    <td><MdPix size={32} /></td>
                                </tr>
                            )
                        })}
                        {transfersdp.map(transfersdp => {
                            return (
                                <tr key={transfersdp.id}>
                                    <td width="30%">{transfersdp.description}</td>
                                    <td>
                                        <ValueTransfers variant={transfersdp.type}>
                                            {transfersdp.type === "output" && "- "}
                                            {valueFormatter(transfersdp.value)}
                                        </ValueTransfers>
                                    </td>
                                    <td>{transfersdp.category}</td>
                                    <td>{dateFormatter.format(new Date(transfersdp.createdAt))}</td>
                                    <td><MdPix size={32} /></td>
                                </tr>
                            )
                        })}
                    </tbody>
                </TableContent>
            </TableContainer>

        </div>
    )
}