import axios from "axios";
import {
    loginFailed,
    loginRequest,
    loginSuccess,
    registerFailed,
    registerRequest,
    registerSuccess,
} from "./slices/authSlice";

axios.defaults.baseURL = "http://localhost:4000";

export const loginUser = async (payload, dispatch, navigate) => {
    dispatch(loginRequest());
    try {
        const res = await axios.post("/user/login", payload);
        dispatch(loginSuccess(res.data));
        navigate("/chat");
    } catch (error) {
        dispatch(loginFailed(error.response.data));
    }
};

export const registerUser = async (payload, dispatch, navigate) => {
    dispatch(registerRequest());
    try {
        const res = await axios.post("/user/register", payload);
        dispatch(registerSuccess(res.data));
        navigate("/chat");
    } catch (error) {
        dispatch(registerFailed(error.response.data));
    }
};
