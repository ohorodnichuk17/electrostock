import {createAsyncThunk} from "@reduxjs/toolkit";
import {ILogin, IRegister} from "../../interfaces/authentication";
import {apiClient} from "../../utils/api/apiClient";
import {handleAxiosError} from "../../utils/errors/handleAxiosError";

export const register = createAsyncThunk(
    'authentication/register',
    async (payload: IRegister, { rejectWithValue }) => {
        try {
            const response = await apiClient.post('/api/authentication/register', payload);
            console.log("Backend response:", response.data);
            return response.data;
        } catch (error) {
            return rejectWithValue(handleAxiosError(error, 'Error'));
        }
    },
);

export const login = createAsyncThunk(
    'authentication/login',
    async(payload: ILogin, {rejectWithValue}) => {
        try {
            const response = await apiClient.post('/api/authentication/login', payload);
            console.log("Backend response:", response.data);
            return response.data;
        } catch (error) {
            return rejectWithValue(handleAxiosError(error, 'Error'));
        }
    },
);