import * as React from "react";
import { useState } from 'react'
import {Route, Routes} from "react-router-dom";
import DefaultLayout from "./components/containers/DefaultLayout.tsx";
import RegisterPage from "./components/authentication/RegisterPage.tsx";
import LoginPage from "./components/authentication/LoginPage.tsx";
import RegisterSuccessPage from "./components/authentication/RegisterSuccessPage.tsx";
import MainPage from "./components/MainPage/MainPage.tsx";
import WarestoreCreatePage from "./components/warestore/WarestoreCreatePage.tsx";

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Routes>
        <Route path="/" element={<DefaultLayout />}>
            <Route index element={<MainPage />} />
            <Route path="register" element={<RegisterPage />}/>
            <Route path="login" element={<LoginPage />}/>
            <Route path="register-success" element={<RegisterSuccessPage />} />

            <Route path={"warestore/create"} element={<WarestoreCreatePage />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
