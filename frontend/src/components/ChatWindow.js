import { Col, Container, Row } from "react-bootstrap";
import { ChatInfo } from "./ChatInfo";
import { ChatBox } from "./ChatBox";

const listMem = [
    { id: 0, username: "david", avatar: null },
    { id: 1, username: "silva", avatar: null },
    { id: 2, username: "ronall", avatar: null },
];

export const ChatWindow = () => {
    return (
        <section className="chat-window">
            <Container fluid className="g-0">
                <Row className="g-0">
                    <Col md={9}>
                        <ChatBox quantityMem={listMem.length} />
                    </Col>
                    <Col md={3}>
                        <ChatInfo listMembers={listMem} />
                    </Col>
                </Row>
            </Container>
        </section>
    );
};
