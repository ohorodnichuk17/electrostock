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

function App() {
    const { isSupplier } = useAppSelector(state => state.authentication); // Отримуємо статус користувача (якщо він постачальник)

    return (
        <>
            <Routes>
                <Route path="/" element={<DefaultLayout />}>
                    <Route index element={<MainPage />} />
                    <Route path="register" element={<RegisterPage />} />
                    <Route path="login" element={<LoginPage />} />
                    <Route path="register-success" element={<RegisterSuccessPage />} />

                    {isSupplier ? (
                        <>
                            <Route path="warehouses" element={<WarestoreListPage />} />
                            <Route path="warehouse/create" element={<WarestoreCreatePage />} />
                            <Route path="warehouse/edit/:id" element={<WarestoreEditPage />} />
                        </>
                    ) : (
                        <>
                            <Route path="warehouses" element={<Navigate to="/" />} />
                            <Route path="warehouse/create" element={<Navigate to="/" />} />
                            <Route path="warehouse/edit/:id" element={<Navigate to="/" />} />
                        </>
                    )}
                </Route>
            </Routes>
        </>
    );
}

export default App;
