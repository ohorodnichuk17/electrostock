import * as React from "react";
import {Route, Routes} from "react-router-dom";
import DefaultLayout from "./components/containers/DefaultLayout.tsx";
import RegisterPage from "./components/authentication/RegisterPage.tsx";
import LoginPage from "./components/authentication/LoginPage.tsx";
import RegisterSuccessPage from "./components/authentication/RegisterSuccessPage.tsx";
import MainPage from "./components/MainPage/MainPage.tsx";
import WarestoreCreatePage from "./components/warestore/WarestoreCreatePage.tsx";
import WarestoreListPage from "./components/warestore/WarestoreListPage.tsx";
import WarestoreEditPage from "./components/warestore/WarestoreEditPage.tsx";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<DefaultLayout />}>
            <Route index element={<MainPage />} />
            <Route path="register" element={<RegisterPage />}/>
            <Route path="login" element={<LoginPage />}/>
            <Route path="register-success" element={<RegisterSuccessPage />} />

            <Route path="warestores" element={<WarestoreListPage/>}/>
            <Route path="warestore/create" element={<WarestoreCreatePage />} />
            <Route path="warestore/edit/:id" element={<WarestoreEditPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App
