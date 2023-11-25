import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import { ProfileModal } from "./components/ProfileModal";
import { PrivateRoute } from "./components/PrivateRoute";
import { publicRoutes } from "./config/routes";

import "react-toastify/dist/ReactToastify.css";
import "./App.scss";

function App() {
    return (
        <div className="App">
            <Routes>
                {publicRoutes.map((route) => {
                    const Element = route.component;
                    return (
                        <Route
                            key={route.path}
                            path={route.path}
                            element={
                                <PrivateRoute>
                                    <Element />
                                </PrivateRoute>
                            }
                        />
                    );
                })}
            </Routes>
            <ProfileModal />
            <ToastContainer />
        </div>
    );
}

export default App;
