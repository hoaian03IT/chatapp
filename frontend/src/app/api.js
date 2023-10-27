import axios from "axios";
import {
    logOutFailed,
    logOutRequest,
    logOutSuccess,
    loginFailed,
    loginRequest,
    loginSuccess,
    registerFailed,
    registerRequest,
    registerSuccess,
    updateProfileFailed,
    updateProfileRequest,
    updateProfileSuccess,
} from "./slices/authSlice";

axios.defaults.baseURL = "http://localhost:4000";

export const loginUser = async (payload, dispatch, navigate) => {
    dispatch(loginRequest());
    try {
        const res = await axios.post("/user/login", payload, {
            withCredentials: true,
        });
        dispatch(loginSuccess(res.data));
        navigate("/chat");
    } catch (error) {
        const errorMessage = error?.response?.data.message || error.message;
        dispatch(loginFailed(errorMessage));
        alert(errorMessage);
    }
};

export const registerUser = async (payload, dispatch, navigate) => {
    dispatch(registerRequest());
    try {
        const res = await axios.post("/user/register", payload, {
            withCredentials: true,
        });
        dispatch(registerSuccess(res.data));
        navigate("/chat");
    } catch (error) {
        const errorMessage = error?.response?.data.message || error.message;
        dispatch(registerFailed(errorMessage));
        alert(errorMessage);
    }
};

export const updateProfile = async (payload, dispatch, token, axiosJWT) => {
    dispatch(updateProfileRequest());
    try {
        const res = await axiosJWT.post("/user/auth/update-profile", payload, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        dispatch(updateProfileSuccess(res.data));
        alert("Update profile successfully!");
    } catch (error) {
        const errorMessage = error?.response?.data.message || error.message;
        dispatch(updateProfileFailed(errorMessage));
        alert(errorMessage);
    }
};

export const logOutUser = async (dispatch, navigate, axiosJWT) => {
    dispatch(logOutRequest());
    try {
        const res = await axiosJWT.post("/user/auth/logout");
        dispatch(logOutSuccess(res.data));
        navigate("/chat/login");
    } catch (error) {
        const errorMessage = error?.response?.data.message || error.message;
        dispatch(logOutFailed(errorMessage));
        alert(errorMessage);
    }
};

export const refreshToken = async () => {
    try {
        const res = await axios.get("/user/refresh", {
            withCredentials: true,
        });

        return res.data;
    } catch (error) {
        alert(error?.response?.data.message || error.message);
    }
};
