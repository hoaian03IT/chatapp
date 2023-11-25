import { Button } from "react-bootstrap";
import "../styles/chat_info.scss";
import { UserInfo } from "./UserInfo";
import { useContext, useState } from "react";
import { LeaveRoomModal } from "./LeaveRoomModal";
import { ChatContext } from "../pages/Chat";

export const ChatInfo = () => {
    const { participants } = useContext(ChatContext);
    const [showLeaveRoomModal, setShowLeaveRoomModal] = useState(false);

    const getInfoUser = (username) => {};

    return (
        <section className="chat-info d-flex flex-column justify-content-between">
            <div className="chat-members">
                <h3 className="title p-3 fw-bold">Chat members</h3>
                <div className="list-members">
                    {participants &&
                        participants.map((mem) => (
                            <div key={mem.username} className="item-member px-3 py-2">
                                <UserInfo
                                    size="medium"
                                    username={mem.username}
                                    avatar={mem.avatar}
                                    onClick={() => getInfoUser(mem.username)}
                                />
                            </div>
                        ))}
                </div>
            </div>
            <div className="leave-room text-center">
                <Button className="m-3" onClick={() => setShowLeaveRoomModal(true)}>
                    Leave room
                </Button>
            </div>

            <LeaveRoomModal show={showLeaveRoomModal} onHide={() => setShowLeaveRoomModal(false)} />
        </section>
    );
};
