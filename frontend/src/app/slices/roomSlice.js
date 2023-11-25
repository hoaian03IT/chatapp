import { createSlice } from "@reduxjs/toolkit";

export const roomSlide = createSlice({
    name: "room",
    initialState: {
        rooms: [],
        isFetching: false,
        messageError: null,
        error: false,
    },
    reducers: {
        fetchRoomsRequest: (state) => {
            state.isFetching = true;
            state.error = false;
        },
        fetchRoomsSuccess: (state, action) => {
            state.isFetching = false;
            state.rooms = action.payload.rooms;
        },
        fetchRoomsFailed: (state, action) => {
            state.isFetching = false;
            state.messageError = action.payload;
            state.error = true;
        },
        fetchOneRoomRequest: (state) => {
            state.isFetching = true;
            state.error = false;
        },
        fetchOneRoomSuccess: (state, action) => {
            state.isFetching = false;
            state.rooms = state.rooms.map((room) => {
                if (room._id === action.payload._id)
                    return {
                        ...action.payload,
                        lastMessage: action.payload.lastMessage,
                        lastSender: action.payload.lastSender,
                    };
                else return room;
            });
        },
        fetchOneRoomFailed: (state, action) => {
            state.isFetching = false;
            state.error = true;
            state.messageError = action.payload;
        },
        createRoomRequest: (state) => {
            state.isFetching = true;
            state.error = false;
        },
        createRoomSuccess: (state, action) => {
            state.isFetching = false;
            state.rooms.unshift(action.payload);
        },
        createRoomFailed: (state, action) => {
            state.isFetching = false;
            state.messageError = action.payload;
            state.error = true;
        },
        fetchMessagesRequest: (state) => {
            state.isFetching = true;
            state.error = false;
        },
        fetchMessagesSuccess: (state, action) => {
            state.isFetching = false;
        },
        fetchMessagesFailed: (state, action) => {
            state.isFetching = false;
            state.error = true;
            state.messageError = action.payload;
        },

        reInitRoom: (state) => {
            state.rooms = [];
            state.isFetching = false;
            state.messageError = null;
            state.error = false;
        },
    },
});

export const {
    fetchRoomsRequest,
    fetchRoomsSuccess,
    fetchRoomsFailed,
    createRoomRequest,
    createRoomSuccess,
    createRoomFailed,
    reInitRoom,
    fetchMessagesRequest,
    fetchMessagesSuccess,
    fetchMessagesFailed,
    fetchOneRoomRequest,
    fetchOneRoomSuccess,
    fetchOneRoomFailed,
} = roomSlide.actions;
export default roomSlide.reducer;
