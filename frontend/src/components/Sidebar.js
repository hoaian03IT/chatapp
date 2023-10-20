import { Button } from "react-bootstrap";
import { UserInfo } from "./UserInfo";
import { AiOutlinePlus } from "react-icons/ai";

import "../styles/sidebar.scss";
import { RoomList } from "./RoomList";
import { useContext, useState } from "react";
import { ProviderContext } from "./Provider";
import { EditProfileModal } from "./EditProfileModal";
import { CreateRoomModal } from "./CreateRoomModal";

export const Sidebar = () => {
    const { username, avatar } = useContext(ProviderContext);
    const [showEditProfileModal, setShowEditProfileModal] = useState(false);
    const [showCreateModal, setShowCreateModal] = useState(false);
    return (
        <section className="sidebar h-100 d-flex flex-column w-100">
            <header className="header p-4 d-flex justify-content-between flex-wrap">
                <UserInfo size="large" username={username} avatar={avatar} />
                <div className="my-1 w-100 d-flex align-items-center justify-content-center">
                    <Button
                        variant="outline"
                        className="btn-logout btn-medium fw-semibold"
                        onClick={() => setShowEditProfileModal(true)}>
                        Edit profile
                    </Button>
                    <Button variant="outline" className="btn-logout btn-medium fw-semibold">
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
