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
    const [bio, setBio] = useState("Nothing...");
    const [rooms, setRooms] = useState(roomList);

    return <ProviderContext.Provider value={{ rooms, setRooms, bio, setBio }}>{children}</ProviderContext.Provider>;
};
