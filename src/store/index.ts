import {configureStore} from "@reduxjs/toolkit";
import authenticationReducer from './authentication/authentication.slice.ts';
import cartSlice from "./cart/cart.slice.ts";
import orderSlice from "./order/order.slice.ts";


export const store = configureStore({
    reducer: {
        authentication: authenticationReducer,
        cart: cartSlice,
        order: orderSlice
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;