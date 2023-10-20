import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.scss";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { Chat } from "./pages/Chat";
import { ProfileModal } from "./components/ProfileModal";

function App() {
    return (
        <BrowserRouter>
            <div className="App">
                <Routes>
                    <Route path="/chat" element={<Chat />} />
                    <Route path="/chat/login" element={<Login />} />
                    <Route path="/chat/register" element={<Register />} />
                </Routes>
            </div>

            <ProfileModal />
        </BrowserRouter>
    );
}

export default App;
