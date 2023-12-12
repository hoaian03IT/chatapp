import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import { AiOutlinePlus } from "react-icons/ai";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { FaRegPenToSquare } from "react-icons/fa6";

import { UserInfo } from "./UserInfo";
import { RoomList } from "./RoomList";
import { EditProfileModal } from "./EditProfileModal";
import { CreateRoomModal } from "./CreateRoomModal";
import { $auth } from "../app/selectors";
import { createAxiosRequest } from "../utils/createInstance";
import { logOutUser } from "../app/api";
import { SearchUser } from "./SearchUser";
import { Popper } from "./Popper";
import { useDetectClickOutSide } from "../hooks";

import "../styles/sidebar.scss";

export const Sidebar = () => {
    const { currentUser } = useSelector($auth);

    const [showEditProfileModal, setShowEditProfileModal] = useState(false);
    const [showCreateModal, setShowCreateModal] = useState(false);

    const menuRef = useRef(null);
    const isClickOutSide = useDetectClickOutSide(menuRef);

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const axiosJWT = createAxiosRequest(currentUser, dispatch, navigate);

    const handleLogOut = () => {
        logOutUser(dispatch, axiosJWT);
    };

    return (
        <section className="sidebar h-100 d-flex flex-column w-100">
            <header className="header p-4 d-flex justify-content-between align-items-center flex-wrap">
                <UserInfo size="large" username={currentUser?.username} avatar={currentUser?.avatar} />
                <div className="header-menu d-flex justify-content-between align-items-center">
                    <div className="create-room mx-1 fs-5" onClick={() => setShowCreateModal(true)}>
                        <FaRegPenToSquare className="create-room-icon" />
                    </div>
                    <div ref={menuRef} className="menu mx-1 position-relative">
                        <HiOutlineDotsVertical className="fs-3 menu-icon" />
                        {!isClickOutSide && (
                            <Popper className="popper">
                                <div className="menu-list">
                                    <div className="menu-item" onClick={() => setShowEditProfileModal(true)}>
                                        Edit profile
                                    </div>
                                    <div className="menu-item" onClick={handleLogOut}>
                                        Log out
                                    </div>
                                </div>
                            </Popper>
                        )}
                    </div>
                </div>
            </header>
            <main className="main">
                <SearchUser />
                <RoomList />
            </main>

            <EditProfileModal show={showEditProfileModal} onHide={() => setShowEditProfileModal(false)} />
            <CreateRoomModal show={showCreateModal} onHide={() => setShowCreateModal(false)} />
        </section>
    );
};
