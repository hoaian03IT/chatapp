import { Col, Container, Image, Row } from "react-bootstrap";
import { BiErrorAlt } from "react-icons/bi";
import { useContext, useEffect, useState } from "react";
import { ProviderContext } from "../components/Provider";
import defaultAvatar from "../assets/images/default_avatar.png";
import "../styles/message.scss";

export const Message = ({ sender, avatar, message, status }) => {
    const { username } = useContext(ProviderContext);
    const [statusElement, setStatusElement] = useState("");
    const isMe = sender === username;

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
        <section className="message px-3 py-2">
            <Container fluid className="g-0">
                <Row>
                    {!isMe && (
                        <Col md={1} className="align-items-center">
                            <Image className="avatar-medium" src={avatar || defaultAvatar} />
                        </Col>
                    )}
                    <Col
                        md={sender === username ? { span: 6, offset: 6 } : 6}
                        className={`d-flex align-items-${isMe ? "end" : "start"} flex-column`}>
                        <div className="message-item">{message}</div>
                        {isMe && <div className="message-status">{statusElement}</div>}
                    </Col>
                </Row>
            </Container>
        </section>
    );
};
