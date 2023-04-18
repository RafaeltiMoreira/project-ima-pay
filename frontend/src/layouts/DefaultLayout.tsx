import { Outlet } from "react-router-dom";
import { HeaderLogin } from "../components/HeaderLogin";

export function DefaultLayout() {
    return (
        <div>
            <HeaderLogin />
            <Outlet />
        </div>
    )
}