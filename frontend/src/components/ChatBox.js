import { useContext, useEffect, useRef, useState } from "react";
import { Col, Container, Image, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { BsInfoCircle } from "react-icons/bs";
import { AiOutlineEdit } from "react-icons/ai";

import { FormInput } from "./FormInput";
import { Message } from "./Message";
import { ChatInfo } from "./ChatInfo";
import { fetchMembers, fetchMessages, getOneRoom, sendMessage } from "../app/api";
import { useDispatch, useSelector } from "react-redux";
import { $auth, $room } from "../app/selectors";
import { createAxiosRequest } from "../utils/createInstance";
import { ChatContext, SocketContext } from "../pages/Chat";

import "../styles/chat_box.scss";
import { EditRoomModal } from "./EditRoomModal";

export const ChatBox = () => {
    const { rooms } = useSelector($room);
    const { currentUser } = useSelector($auth);

    const { socket } = useContext(SocketContext);
    const { messages, setMessages, setParticipants, currentRoom } = useContext(ChatContext);

    const [showInfo, setShowInfo] = useState(false);
    const [messageValue, setMessageValue] = useState("");
    const [detailRoom, setDetailRoom] = useState(null);
    const [roomEditable, setRoomEditable] = useState(false);
    const [showEditRoomModal, setShowEditRoomModal] = useState(false);

    const chatBoxRef = useRef(null);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const axiosJWT = createAxiosRequest(currentUser, dispatch, navigate);

    const { room } = useParams();

    const handleShowMembers = () => {
        if (currentRoom) setShowInfo(!showInfo);
    };

    const handleSubmit = async () => {
        const message = await sendMessage(
            { room: currentRoom, sender: currentUser._id, content: messageValue },
            axiosJWT
        );

        socket.current.emit("send-message", { message, room: currentRoom });
    };

    useEffect(() => {
        const fetchRoom = async () => {
            if (room && room !== "all") {
                const { messages } = await fetchMessages(dispatch, navigate, room, axiosJWT);
                setMessages(messages);
                socket.current.emit("join-room", { room: currentRoom });

                const { participants } = await fetchMembers(currentRoom, axiosJWT);
                setParticipants(participants);
            }
        };
        fetchRoom();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [room]);

    useEffect(() => {
        rooms && setDetailRoom(rooms.find((room) => room._id === currentRoom));
    }, [rooms, currentRoom]);

    useEffect(() => {
        socket.current?.on("receive-message", async (data) => {
            setMessages((prev) => [...prev, data]);
            await getOneRoom(currentRoom, dispatch, axiosJWT);
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [socket.current]);

    useEffect(() => {
        chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }, [messages]);

    return (
        <Container fluid className="g-0 w-100 chat-box">
            <Row className="g-0 flex-md-nowrap">
                <Col md={showInfo ? 9 : 12}>
                    <header className="header py-5 px-3 d-flex align-items-center justify-content-between">
                        <div
                            className="wrapper-header d-flex align-items-center"
                            onMouseMove={() => setRoomEditable(true)}
                            onMouseOut={() => setRoomEditable(false)}>
                            <Image className="room-pic avatar-large" src={detailRoom?.picRoom} />
                            <div className="content ms-4">
                                <h3 className="name m-0 d-block fw-semibold">{detailRoom?.nameRoom}</h3>
                            </div>
                            {roomEditable && (
                                <div className="edit-room" onClick={() => setShowEditRoomModal(true)}>
                                    <AiOutlineEdit className="edit-icon ms-3 fs-5" />
                                </div>
                            )}
                        </div>
                        <div>
                            <BsInfoCircle className="icon-more-info fs-3" onClick={handleShowMembers} />
                        </div>
                    </header>
                    <div ref={chatBoxRef} className="messages py-2">
                        {messages.map((message) => {
                            const {
                                detailSender: { avatar, username },
                            } = message;
                            return (
                                <Message
                                    key={message._id}
                                    sender={username}
                                    avatar={avatar}
                                    message={message.content}
                                    status={message.status}
                                />
                            );
                        })}
                    </div>
                    <FormInput messageValue={messageValue} setMessageValue={setMessageValue} submit={handleSubmit} />
                </Col>
                {showInfo && (
                    <Col md={3}>
                        <ChatInfo />
                    </Col>
                )}
            </Row>

            <EditRoomModal
                show={showEditRoomModal}
                onHide={() => setShowEditRoomModal(false)}
                idRoom={detailRoom?._id}
                image={detailRoom?.picRoom}
                name={detailRoom?.nameRoom}
            />
        </Container>
    );
};
