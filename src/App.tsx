import * as React from "react";
import { useState } from 'react'
import {Route, Routes} from "react-router-dom";
import DefaultLayout from "./components/containers/DefaultLayout.tsx";
import RegisterPage from "./components/authentication/RegisterPage.tsx";
import LoginPage from "./components/authentication/LoginPage.tsx";

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Routes>
        <Route path="/" element={<DefaultLayout />}>
            <Route path="register" element={<RegisterPage />}/>
            <Route path="login" element={<LoginPage />}/>

        </Route>
      </Routes>
    </>
  )
}

export default App
