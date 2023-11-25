import axios from "axios";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
import { refreshToken } from "../app/api";
import { pathname } from "../config/pathname";
import { reInitRoom } from "../app/slices/roomSlice";

export const createAxiosRequest = (user, dispatch, navigate, updateSuccess) => {
    const newInstance = axios.create();
    newInstance.interceptors.request.use(
        async (config) => {
            // check token's expire
            let currentToken = user?.token;
            const decodedToken = jwtDecode(user?.token);
            if (decodedToken.exp < new Date().getTime() / 1000) {
                try {
                    const res = await refreshToken(navigate);
                    currentToken = res.data.token;
                    // update token by pass updateSuccess with any update info actions
                    updateSuccess && dispatch(updateSuccess({ ...user, token: currentToken }));
                } catch (error) {
                    localStorage.removeItem("persist:root");
                    Cookies.remove("refreshToken");
                    dispatch(reInitRoom());
                    navigate(pathname.login);
                }
            }
            config.headers.Authorization = "Bearer " + currentToken;
            return config;
        },
        (err) => {
            console.log("interceptor error: ", err);
            return Promise.reject(err);
        }
    );

    return newInstance;
};
