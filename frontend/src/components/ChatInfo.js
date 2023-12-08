import { Button } from "react-bootstrap";
import { useCallback, useContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LeaveRoomModal } from "./LeaveRoomModal";
import { UserInfo } from "./UserInfo";
import { ChatContext } from "../pages/Chat";
import { UserInfoModal } from "./UserInfoModal";
import { fetchUserInfo } from "../app/api";
import { createAxiosRequest } from "../utils/createInstance";

import "../styles/chat_info.scss";
import { $auth } from "../app/selectors";
import { loginSuccess } from "../app/slices/authSlice";
export const ChatInfo = () => {
    const { currentUser } = useSelector($auth);
    const { participants } = useContext(ChatContext);
    const [userInfo, setUserInfo] = useState();
    const [showLeaveRoomModal, setShowLeaveRoomModal] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const getInfoUser = useCallback(
        async (id) => {
            const axiosJWT = createAxiosRequest(currentUser, dispatch, navigate, loginSuccess);
            const { username, avatar, bio } = await fetchUserInfo(id, axiosJWT);
            setUserInfo({ username, avatar, bio });
        },
        [currentUser, dispatch, navigate]
    );

    return (
        <section className="chat-info d-flex flex-column justify-content-between">
            <div className="chat-members">
                <h3 className="title p-3 fw-bold">Chat members</h3>
                <div className="list-members">
                    {participants &&
                        participants.map((mem) => (
                            <div key={mem._id} className="item-member px-3 py-2">
                                <UserInfo
                                    size="medium"
                                    username={mem.username}
                                    avatar={mem.avatar}
                                    onClick={() => getInfoUser(mem._id)}
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
            <UserInfoModal {...userInfo} />
            <LeaveRoomModal show={showLeaveRoomModal} onHide={() => setShowLeaveRoomModal(false)} />
        </section>
    );
};
