import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IComponentItem } from '../../interfaces/component';

interface CartState {
    cartItems: IComponentItem[];
}

const initialState: CartState = {
    cartItems: [],
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<IComponentItem>) => {
            state.cartItems.push(action.payload);
        },
        removeFromCart: (state, action: PayloadAction<number>) => {
            state.cartItems = state.cartItems.filter(item => item.id !== action.payload);
        },
    },
});

export const { addToCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;
