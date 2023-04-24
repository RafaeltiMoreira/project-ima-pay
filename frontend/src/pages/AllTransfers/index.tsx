import { AllTransfersCards, AllTransfersContainer } from "./styles";
import { MdOutlinePayments, MdRemoveRedEye } from "react-icons/md";
import { valueFormatter } from "../../utils/formatter";
import { transfersPixDp } from "../../hooks/transfersPixDp";
import { useState } from "react";


export function AllTransfers() {
    const transferAll = transfersPixDp();
    const [showBalance, setShowBalance] = useState(false);

    const handleClick = () => {
        setShowBalance(!showBalance);
    }

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
                        <button onClick={handleClick}>
                            <MdRemoveRedEye size={32} color="#2C053B" />
                        </button>
                    </header>
                    <legend className="legend-amount">Saldo:</legend>
                    <strong>
                        {showBalance ? valueFormatter(transferAll.total) : '******'}
                    </strong>
                </AllTransfersCards>
            </AllTransfersContainer>

        </div>
    )
}