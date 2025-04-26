import * as React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import DefaultLayout from "./components/containers/DefaultLayout.tsx";
import RegisterPage from "./components/authentication/RegisterPage.tsx";
import LoginPage from "./components/authentication/LoginPage.tsx";
import RegisterSuccessPage from "./components/authentication/RegisterSuccessPage.tsx";
import MainPage from "./components/MainPage/MainPage.tsx";
import WarestoreCreatePage from "./components/warestore/supplier/WarestoreCreatePage.tsx";
import WarestoreListPage from "./components/warestore/supplier/WarestoreListPage.tsx";
import WarestoreEditPage from "./components/warestore/supplier/WarestoreEditPage.tsx";
import { useAppSelector } from "./hooks/redux";
import TransistorWarestore from "./components/warestore/TransistorWarestore.tsx";
import ResistorWarestore from "./components/warestore/ResistorWarestore.tsx";
import ControllerWarestore from "./components/warestore/ControllerWarestore.tsx";
import MicrochipWarestore from "./components/warestore/MicrochipWarestore.tsx";
import ComponentCreatePage from "./components/component/supplier/ComponentCreatePage.tsx";
import ComponentListPage from "./components/component/supplier/ComponentListPage.tsx";
import ComponentEditPage from "./components/component/supplier/ComponentEditPage.tsx";
import OrderCreatePage from "./components/order/OrderCreatePage.tsx";

function App() {
    const { isSupplier } = useAppSelector(state => state.authentication);

    return (
        <>
            <Routes>
                <Route path="/" element={<DefaultLayout />}>
                    <Route index element={<MainPage />} />
                    <Route path="register" element={<RegisterPage />} />
                    <Route path="login" element={<LoginPage />} />
                    <Route path="register-success" element={<RegisterSuccessPage />} />
                    <Route path="warehouse/transistors" element={<TransistorWarestore />} />
                    <Route path="warehouse/resistors" element={<ResistorWarestore />} />
                    <Route path="warehouse/controllers" element={<ControllerWarestore />} />
                    <Route path="warehouse/microchips" element={<MicrochipWarestore />} />
                    <Route path="create-order" element={<OrderCreatePage />} />

                    {isSupplier ? (
                        <>
                            <Route path="warehouses" element={<WarestoreListPage />} />
                            <Route path="warehouse/create" element={<WarestoreCreatePage />} />
                            <Route path="warehouse/edit/:id" element={<WarestoreEditPage />} />
                            <Route path="component/create" element={<ComponentCreatePage />} />
                            <Route path="components" element={<ComponentListPage/>}/>
                            <Route path="component/edit/:id" element={<ComponentEditPage />} />
                        </>
                    ) : (
                        <>
                            <Route path="warehouses" element={<Navigate to="/" />} />
                            <Route path="warehouse/create" element={<Navigate to="/" />} />
                            <Route path="warehouse/edit/:id" element={<Navigate to="/" />} />
                            <Route path="component/create" element={<Navigate to="/" />} />
                            <Route path="components" element={ <Navigate to="/" />} />
                            <Route path="component/edit/:id" element={<Navigate to="/" />} />
                        </>
                    )}
                </Route>
            </Routes>
        </>
    );
}

export default App;
