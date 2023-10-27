import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "react-bootstrap";
import { AiOutlinePlus } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

import { UserInfo } from "./UserInfo";
import { RoomList } from "./RoomList";
import { EditProfileModal } from "./EditProfileModal";
import { CreateRoomModal } from "./CreateRoomModal";
import { $auth } from "../app/selectors/authSelector";
import { createAxios } from "../utils/createInstance";

import "../styles/sidebar.scss";
import { logOutUser } from "../app/api";

export const Sidebar = () => {
    const { currentUser, isFetching } = useSelector($auth);

    const [showEditProfileModal, setShowEditProfileModal] = useState(false);
    const [showCreateModal, setShowCreateModal] = useState(false);

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const axiosJWT = createAxios(currentUser, dispatch);

    const handleLogOut = () => {
        logOutUser(dispatch, navigate, currentUser.token, axiosJWT);
    };

    return (
        <section className="sidebar h-100 d-flex flex-column w-100">
            <header className="header p-4 d-flex justify-content-between flex-wrap">
                <UserInfo size="large" username={currentUser?.username} avatar={currentUser?.avatar} />
                <div className="my-1 w-100 d-flex align-items-center justify-content-center">
                    <Button
                        variant="outline"
                        className="btn-logout btn-medium fw-semibold"
                        onClick={() => setShowEditProfileModal(true)}>
                        Edit profile
                    </Button>
                    <Button
                        variant="outline"
                        className={
                            isFetching
                                ? "btn-logout btn-medium fw-semibold"
                                : "btn-logout btn-medium fw-semibold disable"
                        }
                        onClick={handleLogOut}>
                        Log out
                    </Button>
                </div>
            </header>
            <main className="main">
                <button className="btn-create-new-chat py-2 w-100" onClick={() => setShowCreateModal(true)}>
                    <div className="wrapper-icon-create">
                        <AiOutlinePlus className="icon-create fs-1" />
                    </div>
                    <span className="title fw-semibold">Create new room</span>
                </button>
                <RoomList />
            </main>

            <EditProfileModal show={showEditProfileModal} onHide={() => setShowEditProfileModal(false)} />
            <CreateRoomModal show={showCreateModal} onHide={() => setShowCreateModal(false)} />
        </section>
    );
};
