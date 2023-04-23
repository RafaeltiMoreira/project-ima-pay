import { Outlet } from "react-router-dom";
//import { HeaderLogin } from "../../components/HeaderLogin";
import { LayoutHomeContainer } from "./styles";
import { HeaderProfile } from "../../components/HeaderProfile";



export function DefaultHome() {
    return (
        <LayoutHomeContainer>
            <HeaderProfile />
            <Outlet />
        </LayoutHomeContainer>
    )
}