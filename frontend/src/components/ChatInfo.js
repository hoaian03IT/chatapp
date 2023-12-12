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
    const [showUserInfoModal, setShowUserInfoModal] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const axiosJWT = createAxiosRequest(currentUser, dispatch, navigate, loginSuccess);

    const getInfoUser = useCallback(
        async (id) => {
            try {
                if (id !== currentUser._id) {
                    const { username, avatar, bio, isFriend, _id } = await fetchUserInfo(id, axiosJWT);
                    setUserInfo({ username, avatar, bio, _id, isFriend });
                    setShowUserInfoModal(true);
                }
            } catch (error) {}
        },
        [axiosJWT, currentUser?._id]
    );

    return (
        <section className="chat-info d-flex flex-column justify-content-between">
            <div className="chat-members">
                <h3 className="title p-3 fw-bold">Chat members</h3>
                <div className="list-members mx-2">
                    {participants &&
                        participants.map((mem) => (
                            <div
                                key={mem._id}
                                className={
                                    currentUser?._id === mem._id
                                        ? "item-member not-hover px-3 py-2"
                                        : "item-member px-3 py-2"
                                }>
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
            <UserInfoModal
                {...userInfo}
                show={showUserInfoModal}
                onHide={() => setShowUserInfoModal(false)}
                axiosJWT={axiosJWT}
            />
            <LeaveRoomModal show={showLeaveRoomModal} onHide={() => setShowLeaveRoomModal(false)} />
        </section>
    );
};
