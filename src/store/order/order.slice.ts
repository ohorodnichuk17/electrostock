import { createSlice } from '@reduxjs/toolkit';
import { IOrderCreate, IOrderItem } from '../../interfaces/order';
import {createOrder, deleteOrder, getAllOrders, getOrderById} from "./order.action.ts";

interface OrderState {
    orders: IOrderItem[];
    selectedOrder: IOrderItem | null;
    loading: boolean;
    error: string | null;
    createdOrder: IOrderCreate | null;
}

const initialState: OrderState = {
    orders: [],
    selectedOrder: null,
    loading: false,
    error: null,
    createdOrder: null,
};

const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createOrder.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createOrder.fulfilled, (state, action) => {
                state.loading = false;
                state.createdOrder = action.payload;
            })
            .addCase(createOrder.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Failed to create order';
            })

            .addCase(getOrderById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getOrderById.fulfilled, (state, action) => {
                state.loading = false;
                state.selectedOrder = action.payload;
            })
            .addCase(getOrderById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Failed to fetch order';
            })

            .addCase(getAllOrders.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAllOrders.fulfilled, (state, action) => {
                state.loading = false;
                state.orders = action.payload;
            })
            .addCase(getAllOrders.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Failed to fetch orders';
            })

            .addCase(deleteOrder.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteOrder.fulfilled, (state, action) => {
                state.loading = false;
                state.orders = state.orders.filter(order => order.id !== action.meta.arg);
            })
            .addCase(deleteOrder.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Failed to delete order';
            });
    },
});

export default orderSlice.reducer;
