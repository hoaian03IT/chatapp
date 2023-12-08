import { BsFillChatDotsFill } from "react-icons/bs";

import { ChatBox } from "./ChatBox";

import "../styles/chat_window.scss";
import { useContext, useEffect } from "react";
import { ChatContext } from "../pages/Chat";
import { useParams } from "react-router-dom";

export const ChatWindow = () => {
    const { currentRoom, setCurrentRoom } = useContext(ChatContext);
    const { room } = useParams();
    useEffect(() => {
        if (room && room !== "all") setCurrentRoom(room);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        <section className="chat-window">
            {currentRoom ? (
                <ChatBox />
            ) : (
                <div className="mt-5 p-4 empty-chatbox">
                    <p className="title fs-3 fw-bold">Open room to chat</p>
                    <BsFillChatDotsFill className="icon-inbox" />
                </div>
            )}
        </section>
    );
};
