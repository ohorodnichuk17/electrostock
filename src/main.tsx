import * as React from "react";
import { createRoot } from 'react-dom/client';
import './index.css'
import App from './App.tsx'
import {getLocalStorage} from "./utils/storage/localStorageUtils.ts";
import {isTokenActive} from "./utils/storage/isTokenActive.ts";
import {store} from "./store";
import {autoLogin} from "./store/authentication/authentication.slice.ts";
import {Provider} from "react-redux";
import { BrowserRouter } from 'react-router-dom';

const token = getLocalStorage('authToken');
if(typeof token == 'string') {
    if(isTokenActive(token)) {
        store.dispatch(autoLogin(token));
    }
}

createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <BrowserRouter>
            <Provider store={store}>
                <App />
            </Provider>
        </BrowserRouter>
    </React.StrictMode> as React.ReactNode,
);
