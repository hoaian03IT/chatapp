import { createContext, useState } from "react";

export const ProviderContext = createContext();

const roomList = [
    {
        idRoom: 0,
        roomPic: null,
        nameRoom: "hehehehe",
        lastMessage: { user: "toideptrai.03", msg: "Chieu nay di nhau khong?" },
    },
];

export const Provider = ({ children }) => {
    // username max length = 12
    const [username, setUsername] = useState("hoaian03");
    const [avatar, setAvatar] = useState(
        "https://img.freepik.com/premium-photo/portrait-beautiful-anime-girl-avatar-computer-graphic-background-2d-illustration_67092-2017.jpg"
    );
    const [bio, setBio] = useState("Nothing...");
    const [rooms, setRooms] = useState(roomList);

    return (
        <ProviderContext.Provider value={{ username, setUsername, avatar, setAvatar, rooms, setRooms, bio, setBio }}>
            {children}
        </ProviderContext.Provider>
    );
};
