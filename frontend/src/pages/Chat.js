import { Col, Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { createContext, useEffect, useRef, useState } from "react";
import io from "socket.io-client";

import { Sidebar } from "../components/Sidebar";
import { ChatWindow } from "../components/ChatWindow";
import { $auth } from "../app/selectors";

import "../styles/chat_page.scss";

export const SocketContext = createContext();
export const ChatContext = createContext();

export const Chat = () => {
    const [messages, setMessages] = useState([]);
    const [participants, setParticipants] = useState([]);
    const [currentRoom, setCurrentRoom] = useState(null);
    const { currentUser } = useSelector($auth);
    const socket = useRef(null);

    useEffect(() => {
        if (currentUser) {
            socket.current = io.connect(process.env.REACT_APP_HOST);
            const userId = currentUser._id;
            socket.current.emit("add-user", { userId });
        }

        return () => {
            socket.current?.disconnect();
        };
    }, [currentUser]);

    return (
        <ChatContext.Provider
            value={{ messages, setMessages, participants, setParticipants, currentRoom, setCurrentRoom }}>
            <SocketContext.Provider value={{ socket }}>
                <section className="chat-page h-100">
                    <Container fluid className="g-0 h-100">
                        <Row className="g-0 h-100">
                            <Col md={3}>
                                <Sidebar />
                            </Col>
                            <Col md={9}>
                                <ChatWindow />
                            </Col>
                        </Row>
                    </Container>
                </section>
            </SocketContext.Provider>
        </ChatContext.Provider>
    );
};
