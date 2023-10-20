import { useContext } from "react";
import groupPicDefault from "../assets/images/group_pic_default.png";
import { ProviderContext } from "./Provider";
import { Image } from "react-bootstrap";

import "../styles/roomlist.scss";

export const RoomList = () => {
    const { rooms } = useContext(ProviderContext);
    return (
        <section className="room-list w-100">
            {rooms.map((room) => (
                <div key={room.idRoom} className="room-item p-3 d-flex align-items-center">
                    <Image className="room-pic avatar-larger" src={room.roomPic || groupPicDefault} />
                    <div className="room-content ms-3 d-flex flex-column">
                        <span className="room-name fw-semibold">{room.nameRoom}</span>
                        <span className="last-message fw-light">
                            <span className="fw-semibold">{room.lastMessage?.user}</span>: {room.lastMessage?.msg}
                        </span>
                    </div>
                </div>
            ))}
        </section>
    );
};
