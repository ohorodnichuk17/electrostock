import * as React from "react";
import { useState } from 'react'
import {Route, Routes} from "react-router-dom";
import DefaultLayout from "./components/containers/DefaultLayout.tsx";

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Routes>
        <Route path="/" element={<DefaultLayout />}>

        </Route>
      </Routes>
    </>
  )
}

export default App
