import { HeaderLoginContainer, HeaderLoginContent } from "./styles";
import { SignOut } from "phosphor-react";
import { NavLink } from "react-router-dom";
import logoImaPay from "../../assets/logo-ima.webp";

export function HeaderLogin() {
    return (
        <HeaderLoginContainer>
            <HeaderLoginContent>
                <img src={logoImaPay} alt="Logo com texto Imã Pay" />

                <NavLink to="/">
                    <button type="submit">
                        Sair
                        <SignOut
                            className="btn-out"
                            size={28}
                            weight="bold"
                            alt="Botão de sair" />
                    </button>
                </NavLink>

            </HeaderLoginContent>
        </HeaderLoginContainer>
    )
}
console.log(HeaderLogin)