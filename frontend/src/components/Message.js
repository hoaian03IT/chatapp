import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Col, Container, Image, Row } from "react-bootstrap";
import { BiErrorAlt } from "react-icons/bi";
import { $auth } from "../app/selectors";

import "../styles/message.scss";

export const Message = ({ sender, avatar, message, status }) => {
    const { currentUser } = useSelector($auth);
    const [statusElement, setStatusElement] = useState("");
    const isMe = sender === currentUser?.username;

    useEffect(() => {
        status === "success"
            ? setStatusElement(<span>Sent</span>)
            : status === "loading"
            ? setStatusElement(<span>Sending...</span>)
            : status === "failed"
            ? setStatusElement(<BiErrorAlt className="icon-error" />)
            : setStatusElement(null);
    }, [status]);
    return (
        <section className="message px-4 py-2">
            <Container fluid className="g-0">
                <Row>
                    {!isMe && (
                        <Col md={1} className="d-flex align-items-center justify-content-end">
                            <Image className="avatar-medium" src={avatar} />
                        </Col>
                    )}
                    <Col
                        md={isMe ? { span: 6, offset: 6 } : 6}
                        className={`g-0 position-relative d-flex align-items-${isMe ? "end" : "start"} flex-column`}>
                        {!isMe && <div className="message-sender">{sender}</div>}
                        <div className="message-item">{message}</div>
                        {isMe && <div className="message-status">{statusElement}</div>}
                    </Col>
                </Row>
            </Container>
        </section>
    );
};
