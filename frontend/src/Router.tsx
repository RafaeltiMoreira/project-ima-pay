import { Routes, Route } from "react-router-dom";
//import { Transfers } from "./pages/Transfers";
//import { DefaultLayout } from "./layouts/DefaultLayout";
import { Home } from "./pages/Home";
import { Register } from "./pages/Register";
import { Login } from "./pages/Login";
import { Recovery } from "./pages/Recovery";
import { RegisterAddress } from "./pages/RegisterAddress";
import { DefaultHome } from "./layouts/DefaultHome";
import { ViewHistory } from "./pages/ViewHistory";
import { AllTransfers } from "./pages/AllTransfers";
import { DefaultLayout } from "./layouts/DefaultLayout";

export function Router() {
    return (
        <Routes>

            <Route>
                <Route path='/' element={<Home />} />
                <Route path='/register' element={<Register />} />
                <Route path='/register/address' element={<RegisterAddress />} />
                <Route path='/login' element={<Login />} />
                <Route path='/recovery' element={<Recovery />} />
            </Route>

            {/*<Route path="/view/:userId" element={<ViewHistory />} />*/}
            <Route path="/" element={<DefaultLayout />}>
                <Route path="/" element={<DefaultHome />}>
                    <Route path="/view" element={<ViewHistory />} />
                    <Route path="/alltransfers" element={<AllTransfers />} />
                </Route>
            </Route>
        </Routes>
    )
}