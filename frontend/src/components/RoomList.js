import { useDispatch, useSelector } from "react-redux";
import { Image } from "react-bootstrap";
import { memo, useContext, useEffect } from "react";

import { $auth, $room } from "../app/selectors";
import { fetchRooms } from "../app/api";
import { createAxiosRequest } from "../utils/createInstance";
import { useNavigate } from "react-router-dom";
import { loginSuccess } from "../app/slices/authSlice";
import { ChatContext, SocketContext } from "../pages/Chat";
import { pathname } from "../config/pathname";

import "../styles/roomlist.scss";

export const RoomList = memo(() => {
    const { currentUser } = useSelector($auth);
    const { rooms } = useSelector($room);
    const { socket } = useContext(SocketContext);
    const { setCurrentRoom, currentRoom } = useContext(ChatContext);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const axiosJWT = createAxiosRequest(currentUser, dispatch, navigate, loginSuccess);

    const fetchRoomsHandler = async () => {
        await fetchRooms(dispatch, axiosJWT);
    };

    useEffect(() => {
        currentUser?.token && fetchRoomsHandler();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentUser, dispatch, navigate]);

    useEffect(() => {
        socket.current?.on("added-room", (data) => {
            socket.current.emit("join-room", { room: data });
            fetchRoomsHandler();
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [socket.current]);

    const handleOpenRoom = async (idRoom) => {
        setCurrentRoom(idRoom);
        navigate(`${pathname.onlyChat}/${idRoom}`);
    };

    return (
        <section className="room-list m-1">
            {rooms &&
                rooms.map((room) => (
                    <div
                        key={room._id}
                        className={`room-item ${
                            room._id === currentRoom ? "active" : ""
                        } p-3 d-flex align-items-center`}
                        onClick={() => handleOpenRoom(room._id)}>
                        <Image roundedCircle className="room-pic avatar-larger" src={room.picRoom} />
                        <div className="room-content ms-3 d-flex flex-column">
                            <span className="room-name fw-semibold">{room.nameRoom}</span>
                            <span className="last-message fw-light">
                                {room.lastSender && <span className="fw-semibold">{room.lastSender}: </span>}
                                {room.lastMessage}
                            </span>
                        </div>
                    </div>
                ))}
        </section>
    );
});
