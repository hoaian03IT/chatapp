import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import { $auth } from "../app/selectors";
import { pathname as path } from "../config/pathname";

export const PrivateRoute = ({ children }) => {
    const { currentUser } = useSelector($auth);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if (currentUser && (location.pathname.includes(path.login) || location.pathname.includes(path.register))) {
            navigate(path.onlyChat + "/all");
        } else if (
            !currentUser &&
            !location.pathname.includes(path.login) &&
            !location.pathname.includes(path.register)
        ) {
            navigate(path.login);
        }
    }, [currentUser, location.pathname, navigate]);

    return children;
};
