import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { refreshToken } from "../app/api";

export const createAxios = (user, dispatch, updateSuccess) => {
    const newInstance = axios.create();
    newInstance.interceptors.request.use(
        async (config) => {
            // check token's expire
            const decodedToken = jwtDecode(user?.token);
            if (decodedToken.exp < new Date().getTime() / 1000) {
                const data = await refreshToken();
                // update token by pass updateSuccess with any update info actions
                updateSuccess && dispatch(updateSuccess({ ...user, token: data.token }));
                config.headers.Authorization = "Bearer " + data.token;
            }
            return config;
        },
        (err) => {
            console.log("interceptor error: ", err);
            return Promise.reject(err);
        }
    );

    return newInstance;
};
