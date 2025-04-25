import {createAsyncThunk} from "@reduxjs/toolkit";
import {IOrderCreate, IOrderItem} from "../../interfaces/order";
import {apiClient} from "../../utils/api/apiClient.ts";

export const createOrder = createAsyncThunk<
    string,
    IOrderCreate,
    { rejectValue: string }
>(
    "order/create-order",
    async (orderData, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem("authToken");
            console.log("Token in createOrder:", token);  // Log token
            if (!token) {
                return rejectWithValue("Token not found");
            }

            const response = await apiClient.post(
                "api/order/create",
                orderData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    withCredentials: true,
                }
            );
            console.log("API Response:", response);  // Log API response
            return response.data;
        } catch (err: any) {
            console.error("Error creating order:", err);  // Log error details
            return rejectWithValue(err.response?.data || "Error creating order");
        }
    }
);


export const getOrderById = createAsyncThunk<
    IOrderItem,
    string,
    { rejectValue: string }
>(
    "order/get-order-by-id",
    async (orderId, {rejectWithValue}) => {
        try {
            const response = await apiClient.get(`api/order/${orderId}`, {
                withCredentials: true,
            });
            return response.data;
        } catch (err: any) {
            return rejectWithValue(err.response.data);
        }
    }
);

export const getAllOrders = createAsyncThunk<
    IOrderItem[],
    void,
    { rejectValue: string }
>(
    "order/get-all-orders",
    async (_, {rejectWithValue}) => {
        try {
            const response = await apiClient.get("api/order", {
                withCredentials: true,
            });
            return response.data;
        } catch (err: any) {
            return rejectWithValue(err.response.data);
        }
    }
);

export const deleteOrder = createAsyncThunk<
    void,
    string,
    { rejectValue: string }
>(
    "order/delete-order",
    async (orderId, {rejectWithValue}) => {
        try {
            await apiClient.delete(`api/order/${orderId}`, {
                withCredentials: true,
            });
        } catch (err: any) {
            return rejectWithValue(err.response.data);
        }
    }
);