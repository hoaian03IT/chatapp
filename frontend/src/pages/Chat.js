import { Col, Container, Row } from "react-bootstrap";
import { Sidebar } from "../components/Sidebar";
import { ChatWindow } from "../components/ChatWindow";

import "../styles/chat_page.scss";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { $auth } from "../app/selectors/authSelector";
import { useNavigate } from "react-router-dom";

export const Chat = () => {
    const { currentUser } = useSelector($auth);
    const navigate = useNavigate();
    useEffect(() => {
        if (!currentUser) navigate("/chat/login");
    }, [currentUser, navigate]);

    return (
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
    );
};
