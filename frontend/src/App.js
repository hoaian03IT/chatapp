import { BrowserRouter, Route, Routes } from "react-router-dom";

import { ProfileModal } from "./components/ProfileModal";
import { PrivateRoute } from "./components/PrivateRoute";
import { publicRoutes } from "./config/routes";

import "./App.scss";

function App() {
    return (
        <BrowserRouter>
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
            </div>
            <ProfileModal />
        </BrowserRouter>
    );
}

export default App;
