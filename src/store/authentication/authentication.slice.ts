import {AnyAction, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RejectedAction} from "../../utils/types/redux";
import {IAuthenticationState, IUser} from "../../interfaces/authentication";
import {jwtDecode} from "jwt-decode";
import {addLocalStorage, deleteLocalStorage} from "../../utils/storage/localStorageUtils.ts";
import {Status} from "../../utils/enums";
import {act} from "react";
import {login, register} from "./authentication.action.ts";

function isRejectedAction(action: AnyAction): action is RejectedAction {
    return action.type.endsWith('/rejected');
}

const updateUserState = (state: IAuthenticationState, token: string): void => {
    const {name, email, roles} = jwtDecode<IUser>(token);

    if(roles.includes('supplier')) {
        state.isSupplier = true;
    }
    state.user = {
        name,
        email,
        roles,
    };
    state.token = token;
    state.isLogin = true;

    addLocalStorage('authToken', token);
};

const initialState: IAuthenticationState = {
    user: null,
    token: null,
    isLogin: false,
    isSupplier: false,
    status: Status.IDLE,
};

export const authenticationSlice = createSlice({
    name: 'authentication',
    initialState,
    reducers: {
        register: (state, action: PayloadAction<string>) => {
            updateUserState(state, action.payload);
        },
        autoLogin: (state, action: PayloadAction<string>) => {
            updateUserState(state, action.payload);
        },
        logout: (state) => {
            deleteLocalStorage('authToken');
            state.user = null;
            state.token = null;
            state.isLogin = false;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.fulfilled, (state, action) => {
                const { token } = action.payload;
                updateUserState(state, token);
                state.status = Status.SUCCESS;
            })
            .addCase(login.pending, (state) => {
                state.status = Status.LOADING;
            })
            .addCase(register.fulfilled, (state, action) => {
                const { token } = action.payload;
                updateUserState(state, token);
                state.status = Status.SUCCESS;
            })
            .addCase(register.pending, (state) => {
                state.status = Status.LOADING;
            })
            .addMatcher(isRejectedAction, (state) => {
                state.status = Status.ERROR;
            });
    },
});

export const { autoLogin, logout } = authenticationSlice.actions;
export default authenticationSlice.reducer;