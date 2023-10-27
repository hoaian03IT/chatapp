import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { $auth } from "../app/selectors/authSelector";

export const PrivateRoute = ({ children }) => {
    const { currentUser } = useSelector($auth);
    const { pathname } = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const shortestPathname =
            pathname[pathname.length - 1] === "/" ? pathname.slice(0, pathname.length - 1) : pathname;

        if (!currentUser && shortestPathname === "/chat") navigate("/chat/login");
        if (currentUser && (shortestPathname === "/chat/login" || shortestPathname === "/chat/register"))
            navigate("/chat");
    }, [currentUser, pathname, navigate]);

    return children;
};
