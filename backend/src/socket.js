import { Server } from "socket.io";

export const socket = (server) => {
    const getKeyMap = (map, searchedValue) => {
        for (const [key, value] of map) {
            if (searchedValue === value) return key;
        }
        return null;
    };

    const io = new Server(server, {
        cors: {
            origin: "http://localhost:3000",
        },
    });

    global.onlineUsers = new Map();

    io.on("connection", (socket) => {
        console.log(`User ${socket.id} connected`);

        socket.on("add-user", (data) => {
            const { userId } = data;
            onlineUsers.set(userId, socket.id);
            console.log(onlineUsers);
        });

        socket.on("create-room", (data) => {
            const { room, addedUsers } = data;
            socket.join(room);
            console.log(`Room ${room} is created`);
            console.log(`--- user ${socket.id} has joined room ${room}`);
            for (const user of addedUsers) {
                io.to(onlineUsers.get(user._id)).emit("added-room", room);
            }
        });

        socket.on("join-room", (data) => {
            console.log(`--- user ${socket.id} has joined room ${data.room}`);
            socket.join(data.room);
        });

        socket.on("leave-room", (data) => {
            const { room } = data;
            socket.leave(room);
            console.log(`${socket.id} has left ${room} room`);
        });

        socket.on("send-message", (data) => {
            const { message, room } = data;
            console.log(`User ${socket.id} sent: ${message.content} to ${room}`);
            io.to(room).emit("receive-message", message);
        });

        socket.on("disconnect", () => {
            console.log(`User ${socket.id} disconnected`);
            const userId = getKeyMap(onlineUsers, socket.id);
            if (userId) {
                onlineUsers.delete(userId);
                console.log(`User ${socket.id} disconnected`);
            }
        });
    });
};
