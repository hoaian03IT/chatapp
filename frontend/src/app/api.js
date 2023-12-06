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
import {
    createRoomFailed,
    createRoomRequest,
    createRoomSuccess,
    fetchMessagesFailed,
    fetchMessagesRequest,
    fetchMessagesSuccess,
    fetchOneRoomFailed,
    fetchOneRoomRequest,
    fetchOneRoomSuccess,
    fetchRoomsRequest,
    fetchRoomsSuccess,
    reInitRoom,
} from "./slices/roomSlice";
import { pathname } from "../config/pathname";
import { runToast } from "../utils/handleToast";

axios.defaults.baseURL = process.env.REACT_APP_HOST;

export const loginUser = async (payload, dispatch, navigate) => {
    dispatch(loginRequest());
    try {
        const res = await axios.post("/auth/login", payload, {
            withCredentials: true,
        });
        dispatch(loginSuccess(res.data));
        navigate(pathname.onlyChat + "/all");
        runToast("success", "Login successful");
    } catch (error) {
        const errorMessage = error?.response?.data.message || error.message;
        dispatch(loginFailed(errorMessage));
        runToast("error", errorMessage);
    }
};

export const registerUser = async (payload, dispatch, navigate) => {
    dispatch(registerRequest());
    try {
        const res = await axios.post("/auth/register", payload, {
            withCredentials: true,
        });
        dispatch(registerSuccess(res.data));
        navigate(pathname.chat);

        runToast("success", "Register successful");
    } catch (error) {
        const errorMessage = error?.response?.data.message || error.message;
        dispatch(registerFailed(errorMessage));
        runToast("error", errorMessage);
    }
};

export const updateProfile = async (payload, dispatch, axiosJWT) => {
    dispatch(updateProfileRequest());
    try {
        const res = await axiosJWT.post("/user/v/update-profile", payload);

        dispatch(updateProfileSuccess(res.data));
    } catch (error) {
        const errorMessage = error?.response?.data.message || error.message;
        dispatch(updateProfileFailed(errorMessage));
    }
};

export const logOutUser = async (dispatch, axiosJWT) => {
    dispatch(logOutRequest());
    try {
        const res = await axiosJWT.post("/auth/v/logout", null, {
            withCredentials: true,
        });
        dispatch(logOutSuccess(res.data));
        dispatch(reInitRoom());
    } catch (error) {
        const errorMessage = error?.response?.data.message || error.message;
        dispatch(logOutFailed(errorMessage));
    }
};

export const refreshToken = async () => {
    try {
        const res = await axios.get("/auth/refresh", {
            withCredentials: true,
        });

        return res;
    } catch (error) {
        runToast("error", error?.response?.data.message || error.message);
    }
};

export const findUser = async (query) => {
    try {
        const res = await axios.get(`/user/search?q=${query}`);
        return res.data.users;
    } catch (error) {
        // alert("Find user: " + error?.response?.data.message || error.message);
        return [];
    }
};
export const createRoom = async (dispatch, payload, axiosJWT) => {
    dispatch(createRoomRequest());
    try {
        const res = await axiosJWT.post("/room/v/create", payload);
        dispatch(createRoomSuccess(res.data));
        return res.data;
    } catch (error) {
        const errorMessage = error?.response?.data.message || error.message;
        dispatch(createRoomFailed(errorMessage));
        runToast("error", "Create room: " + errorMessage);
    }
};

export const fetchRooms = async (dispatch, axiosJWT) => {
    dispatch(fetchRoomsRequest());
    try {
        const res = await axiosJWT.get("/room/v/get-rooms");
        dispatch(fetchRoomsSuccess(res.data));
    } catch (error) {
        const errorMessage = error?.response?.data.message || error.message;
        dispatch(registerFailed(errorMessage));
        runToast("error", "Fetch room: " + errorMessage);
    }
};

export const fetchMessages = async (dispatch, navigate, idRoom, axiosJWT) => {
    dispatch(fetchMessagesRequest());
    try {
        const res = await axiosJWT.get(`/message/v/messages/${idRoom}`);
        dispatch(fetchMessagesSuccess(res.data._id));
        return res.data;
    } catch (error) {
        const errorMessage = error?.response?.data.message || error.message;
        dispatch(fetchMessagesFailed(errorMessage));
        navigate(pathname + "/all");
        alert(errorMessage);
    }
};

export const fetchMembers = async (idRoom, axiosJWT) => {
    try {
        const res = await axiosJWT.get(`/room/v/list-member/${idRoom}`);
        return res.data;
    } catch (error) {
        alert(error?.response?.data.message || error.message);
    }
};

export const sendMessage = async (payload, axiosJWT) => {
    try {
        const res = await axiosJWT.post("/message/v/send-message", payload);
        return res.data;
    } catch (error) {
        alert(error?.response?.data.message || error.message);
    }
};

export const getOneRoom = async (idRoom, dispatch, axiosJWT) => {
    try {
        dispatch(fetchOneRoomRequest());
        const res = await axiosJWT.get(`/room/v/get-one-room/${idRoom}`);
        dispatch(fetchOneRoomSuccess(res.data));
    } catch (error) {
        const errorMsg = error?.response?.data.message || error.message;
        runToast("error", errorMsg);
        dispatch(fetchOneRoomFailed(errorMsg));
    }
};

export const leaveRoom = async (idRoom, dispatch, navigate, axiosJWT) => {
    try {
        const res = await axiosJWT.post("/room/v/leave-room", { idRoom });
        runToast("success", res.data.message);
        await fetchRooms(dispatch, axiosJWT);
        navigate(`${pathname.onlyChat}/all`);
    } catch (error) {
        const errorMsg = error?.response?.data.message || error.message;
        runToast("error", errorMsg);
    }
};
