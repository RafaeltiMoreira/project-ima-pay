import { TransfersCards, TransfersContainer } from "./styles";
import { NavLink } from "react-router-dom";
import { MdOutlinePayments, MdRemoveRedEye } from "react-icons/md";
import { MagnifyingGlass, Bank } from "phosphor-react";
import * as Dialog from "@radix-ui/react-dialog";
import { ModalTransfersPix } from "../ModalTransfersPix";
import { MdPix } from "react-icons/md"
import { ModalTransfersDeposit } from "../ModalTransfersDeposit";
import { useContext } from "react";
import { TransfersContextPix } from "../../contexts/TransfersContextPix";
import { TransfersContextDp } from "../../contexts/TransfersContextDp";
import { valueFormatter } from "../../utils/formatter";


export function TodoTransfers() {
    const { transferspix } = useContext(TransfersContextPix);
    const { transfersdp } = useContext(TransfersContextDp);

    const transferDp = transfersdp.reduce((acc, transfersDp) => {
        if (transfersDp.type === "input") {
            acc.input += transfersDp.value;
            acc.total += transfersDp.value;
        } else {
            acc.output += transfersDp.value;
            acc.total -= transfersDp.value;
        }

        return acc;
    }, { input: 0, output: 0, total: 0 })

    const transfer = transferspix.reduce((acc, transfers) => {
        if (transfers.type === "input") {
            acc.input += transfers.value;
            acc.total += transfers.value;
        } else {
            acc.output += transfers.value;
            acc.total -= transfers.value;
        }

        return acc;
    }, { input: 0, output: 0, total: 0 })

    return (
        <div>

            <TransfersContainer>

                <NavLink to="/search">
                    <TransfersCards>
                        <header>
                            <MagnifyingGlass size={32} color="#ce1051" />
                            <span>Visualizar transações</span>
                        </header>
                    </TransfersCards>
                </NavLink>
                <Dialog.Root>
                    <Dialog.Trigger asChild>
                        <TransfersCards style={{ cursor: "pointer" }}>
                            <header>
                                <Bank size={32} color="#ce1051" />
                                <span>Transferência</span>
                            </header>
                        </TransfersCards>
                    </Dialog.Trigger>
                    <ModalTransfersDeposit />
                </Dialog.Root>

                <Dialog.Root>
                    <Dialog.Trigger asChild>

                        <TransfersCards style={{ cursor: "pointer" }}>
                            <header>
                                <MdPix size={32} color="#ce1051" />
                                <span>PIX</span>
                            </header>
                        </TransfersCards>

                    </Dialog.Trigger>
                    <ModalTransfersPix />
                </Dialog.Root>

                <TransfersCards>
                    <header>
                        <span>Entradas</span>
                        <MdOutlinePayments size={32} color="#015F43" />
                    </header>
                    <legend>Valor total:</legend>
                    <strong>{valueFormatter(transfer.input || transferDp.input)}</strong>
                </TransfersCards>

                <TransfersCards>
                    <header>
                        <span>Saídas</span>
                        <MdOutlinePayments size={32} color="#ce1051" />
                    </header>
                    <legend>Valor total:</legend>
                    <strong>{valueFormatter(transfer.output || transferDp.input)}</strong>
                </TransfersCards>

                <TransfersCards variant="green">
                    <header>
                        <span>Total</span>
                        <MdRemoveRedEye size={32} color="#2C053B" />
                    </header>
                    <legend>Saldo:</legend>
                    <strong>{valueFormatter(transfer.total || transferDp.total)}</strong>
                </TransfersCards>

            </TransfersContainer>
        </div>
    )
}