import { Button, Modal } from "react-bootstrap";
import "../styles/leave_room_modal.scss";
import { useDispatch, useSelector } from "react-redux";
import { $auth } from "../app/selectors";
import { useContext } from "react";
import { ChatContext, SocketContext } from "../pages/Chat";
import { useNavigate } from "react-router-dom";
import { createAxiosRequest } from "../utils/createInstance";
import { loginSuccess } from "../app/slices/authSlice";
import { leaveRoom } from "../app/api";

export const LeaveRoomModal = ({ show, onHide }) => {
    const { currentUser } = useSelector($auth);
    const { currentRoom: room, setCurrentRoom } = useContext(ChatContext);
    const { socket } = useContext(SocketContext);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLeaveRoom = async () => {
        const axiosJWT = createAxiosRequest(currentUser, dispatch, navigate, loginSuccess);
        try {
            await leaveRoom(room, dispatch, navigate, axiosJWT);
            setCurrentRoom(null);
            socket.current.emit("leave-room", room);
            onHide();
        } catch (error) {}
    };
    return (
        <Modal className="leave-room-modal" show={show} onHide={onHide} size="sm" centered>
            <Modal.Body className="body text-center">
                <div>
                    <span className="fs-5">Do you want to leave this room?</span>
                </div>
                <div className="mt-3">
                    <Button onClick={handleLeaveRoom}>Leave</Button>
                    <Button variant="link" onClick={onHide}>
                        Cancel
                    </Button>
                </div>
            </Modal.Body>
        </Modal>
    );
};
