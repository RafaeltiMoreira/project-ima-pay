import { AllTransfersCards, AllTransfersContainer } from "./styles";
import { MdOutlinePayments, MdRemoveRedEye } from "react-icons/md";
import { valueFormatter } from "../../utils/formatter";
import { transfersPixDp } from "../../hooks/transfersPixDp";


export function AllTransfers() {
    const transferAll = transfersPixDp();

    return (
        <div>

            <AllTransfersContainer>
                <AllTransfersCards>
                    <header>
                        <span>Entradas</span>
                        <MdOutlinePayments size={32} color="#015F43" />
                    </header>
                    <legend className="legend-amount">Valor total:</legend>
                    <strong>{valueFormatter(transferAll.input)}</strong>
                </AllTransfersCards>

                <AllTransfersCards>
                    <header>
                        <span>Saídas</span>
                        <MdOutlinePayments size={32} color="#ce1051" />
                    </header>
                    <legend className="legend-amount">Valor total:</legend>
                    <strong className="text-exit">{valueFormatter(transferAll.output)}</strong>
                </AllTransfersCards>

                <AllTransfersCards variant="green">
                    <header>
                        <span>Total</span>
                        <MdRemoveRedEye size={32} color="#2C053B" />
                    </header>
                    <legend className="legend-amount">Saldo:</legend>
                    <strong>
                        {valueFormatter(transferAll.total)}
                    </strong>
                </AllTransfersCards>
            </AllTransfersContainer>

        </div>
    )
}