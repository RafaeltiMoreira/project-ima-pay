import { Routes, Route } from "react-router-dom";
import { Transfers } from "./pages/Transfers";
import { DefaultLayout } from "./layouts/DefaultLayout";
import { Home } from "./pages/Home";
import { Register } from "./pages/Register";
import { Login } from "./pages/Login";
import { Recovery } from "./pages/Recovery";
import { RegisterAddress } from "./pages/RegisterAddress";
import { DefaultHome } from "./layouts/DefaultHome";
import { ViewHistory } from "./pages/ViewHistory";
import { AllTransfers } from "./pages/AllTransfers";

export function Router() {
    return (
        <Routes>

            <Route path='/sharnonymous-ima-pay' element={<Home />} />
            <Route path='/register' element={<Register />} />
            <Route path='/register/address' element={<RegisterAddress />} />
            <Route path='/login' element={<Login />} />
            <Route path='/recovery' element={<Recovery />} />


            <Route path="/" element={<Home />}>
                <Route path="/" element={<DefaultHome />}>
                    <Route path="/transfers/:userId" element={<Transfers />} />
                    <Route path="/view" element={<ViewHistory />} />
                    <Route path="/alltransfers" element={<AllTransfers />} />
                </Route>

            </Route>
        </Routes>
    )
}