import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
    name: "auth",
    initialState: {
        currentUser: null,
        isFetching: false,
        messageError: null,
        error: false,
    },
    reducers: {
        loginRequest: (state) => {
            state.isFetching = true;
            state.error = false;
        },
        loginSuccess: (state, action) => {
            state.isFetching = false;
            state.currentUser = action.payload;
            state.error = false;
        },
        loginFailed: (state, action) => {
            state.isFetching = false;
            state.messageError = action.payload?.message;
            state.error = true;
        },
        registerRequest: (state) => {
            state.isFetching = true;
            state.error = false;
        },
        registerSuccess: (state, action) => {
            state.isFetching = false;
            state.currentUser = action.payload;
            state.error = false;
        },
        registerFailed: (state, action) => {
            state.isFetching = false;
            state.messageError = action.payload?.message;
            state.error = true;
        },
    },
});

export const { loginRequest, loginSuccess, loginFailed, registerRequest, registerSuccess, registerFailed } =
    authSlice.actions;
export default authSlice.reducer;
