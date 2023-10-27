import { createSlice } from "@reduxjs/toolkit";
import { loginReducer } from "../reducers/login";
import { registerReducer } from "../reducers/register";
import { updateProfileReducer } from "../reducers/updateProfile";
import { logoutReducer } from "../reducers/logOut";

export const authSlice = createSlice({
    name: "auth",
    initialState: {
        currentUser: null,
        isFetching: false,
        messageError: null,
        error: false,
    },
    reducers: {
        // login
        ...loginReducer,

        // register
        ...registerReducer,

        // update profile
        ...updateProfileReducer,

        // log out
        ...logoutReducer,
    },
});

export const {
    loginRequest,
    loginSuccess,
    loginFailed,
    registerRequest,
    registerSuccess,
    registerFailed,
    updateProfileRequest,
    updateProfileSuccess,
    updateProfileFailed,
    logOutRequest,
    logOutSuccess,
    logOutFailed,
} = authSlice.actions;
export default authSlice.reducer;
