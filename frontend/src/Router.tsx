import { Routes, Route } from "react-router-dom";
import { Transfers } from "./pages/Transfers";
import { SearchTransfers } from "./pages/SearchTransfers";
import { DefaultLayout } from "./layouts/DefaultLayout";
import { Home } from "./pages/Home";
import { Register } from "./pages/Register";
import { Login } from "./pages/Login";
import { Recovery } from "./pages/Recovery";
import { RegisterAddress } from "./pages/RegisterAddress";

export function Router() {
    return (
        <Routes>

            <Route path='/' element={<Home />} />
            <Route path='/register' element={<Register />} />
            <Route path='/register/address' element={<RegisterAddress />} />
            <Route path='/login' element={<Login />} />
            <Route path='/recovery' element={<Recovery />} />


            <Route path="/" element={<DefaultLayout />}>
                <Route path="/transfers/:userId" element={<Transfers />} />

                <Route path="/search" element={<SearchTransfers />} />

            </Route>


        </Routes>
    )
}