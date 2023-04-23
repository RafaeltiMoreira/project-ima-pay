import { HeaderButton, HeaderButtonT, HeaderProfileContainer, HeaderProfileContent, HeaderProfileDiv } from "./styles";
import { ArrowsLeftRight, Bank, Scroll, Wallet } from "phosphor-react";
import { NavLink } from "react-router-dom";
import logoImaPay from "../../assets/logo-ima.webp";
import { MdPix } from "react-icons/md";
import * as Dialog from '@radix-ui/react-dialog'
import { TransfersPix } from "../TransfersPix";
import { TransfersDp } from "../TransfersDp";

export function HeaderProfile() {
    return (
        <HeaderProfileContainer>
            <HeaderProfileContent>
                <img src={logoImaPay} alt="Logo com texto Imã Pay" />

                <HeaderProfileDiv>
                    <NavLink to="/alltransfers" title="Saldo bancário">
                        <Bank className="btn-icon" />
                    </NavLink>

                    <Dialog.Root>
                        <HeaderButtonT asChild title="Transferir">
                            <ArrowsLeftRight className="btn-icon" />
                        </HeaderButtonT>
                        <TransfersDp />
                    </Dialog.Root>

                    <Dialog.Root>
                        <HeaderButton asChild title="PIX">
                            <MdPix className="btn-icon" />
                        </HeaderButton>
                        <TransfersPix />
                    </Dialog.Root>

                    <NavLink to="/view" title="Histórico de transações">
                        <Scroll className="btn-icon" />
                    </NavLink>
                </HeaderProfileDiv>

            </HeaderProfileContent>
        </HeaderProfileContainer>
    )
}

