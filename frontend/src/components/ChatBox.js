import { Image } from "react-bootstrap";
import groupPicDefault from "../assets/images/group_pic_default.png";

import "../styles/chat_box.scss";
import { FormInput } from "./FormInput";
import { useEffect, useRef, useState } from "react";
import { Message } from "./Message";

export const ChatBox = ({ roomName, roomPic, quantityMem }) => {
    const [messages, setMessages] = useState([
        { id: Math.random() * 100, sender: "hoaian03", message: "abc", status: "success" },
        { id: Math.random() * 100, sender: "hoaian03", message: "abc", status: "success" },
        { id: Math.random() * 100, sender: "hoaian03", message: "abc", status: "success" },
        { id: Math.random() * 100, sender: "hoaian03", message: "abc", status: "success" },
        { id: Math.random() * 100, sender: "hoaian03", message: "abc", status: "success" },
        { id: Math.random() * 100, sender: "hoaian03", message: "abc", status: "success" },
        { id: Math.random() * 100, sender: "hoaian03", message: "abc", status: "success" },
        { id: Math.random() * 100, sender: "hoaian03", message: "abc", status: "success" },
        { id: Math.random() * 100, sender: "hoaian03", message: "abc", status: "success" },
        { id: Math.random() * 100, sender: "hoaian03", message: "abc", status: "success" },
        { id: Math.random() * 100, sender: "hoaian03", message: "abc", status: "success" },
        { id: Math.random() * 100, sender: "hoaian03", message: "abc", status: "success" },
        { id: Math.random() * 100, sender: "hoaian03", message: "abc", status: "success" },
        { id: Math.random() * 100, sender: "hoaian03", message: "abc", status: "success" },
        { id: Math.random() * 100, sender: "hoaian03", message: "abc", status: "success" },
        { id: Math.random() * 100, sender: "hoaian03", message: "abc", status: "success" },
        { id: Math.random() * 100, sender: "hoaian03", message: "abc", status: "success" },
        { id: Math.random() * 100, sender: "hoaian03", message: "abc", status: "success" },
        { id: Math.random() * 100, sender: "hoaian03", message: "abc", status: "success" },
        { id: Math.random() * 100, sender: "hoaian03", message: "abc", status: "success" },
        { id: Math.random() * 100, sender: "hoaian03", message: "abc", status: "success" },
    ]);
    const refInput = useRef(null);
    const chatBoxRef = useRef(null);

    const handleSendMessage = () => {
        setMessages((prev) => [
            ...prev,
            { id: Math.random() * 10, sender: "hoaian03", message: refInput.current.value, status: "success" },
        ]);
    };

    useEffect(() => {
        chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }, [messages]);

    return (
        <section className="chat-box d-flex flex-column justify-content-between">
            <div>
                <header className="header py-2">
                    <div className="wrapper-header p-3 d-flex align-items-center">
                        <Image className="room-pic avatar-large" src={roomPic || groupPicDefault} />
                        <div className="content ms-4">
                            <h3 className="name m-0 d-block fw-semibold">{roomName || "_room_name_"}</h3>
                            <span className="quantity-member d-block">{quantityMem} members</span>
                        </div>
                    </div>
                </header>
                <div ref={chatBoxRef} className="messages">
                    {messages.map((message) => (
                        <Message
                            key={message.id}
                            sender={message.sender}
                            avatar={message.avatar}
                            message={message.message}
                            status={message.status}
                        />
                    ))}
                </div>
            </div>
            <FormInput ref={refInput} submit={handleSendMessage} />
        </section>
    );
};
