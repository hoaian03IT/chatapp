import { Chat } from "../pages/Chat";
import { Login } from "../pages/Login";
import { Register } from "../pages/Register";
import { pathname } from "./pathname";

export const publicRoutes = [
    { path: pathname.chat, component: Chat },
    { path: pathname.login, component: Login },
    { path: pathname.register, component: Register },
];
