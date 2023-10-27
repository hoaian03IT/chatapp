import { Col, Container, Row } from "react-bootstrap";
import { Sidebar } from "../components/Sidebar";
import { ChatWindow } from "../components/ChatWindow";

import "../styles/chat_page.scss";

export const Chat = () => {
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
