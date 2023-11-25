import { combineReducers } from "redux";
import authReducer from "../slices/authSlice";
import roomReducer from "../slices/roomSlice";

export default combineReducers({
    auth: authReducer,
    room: roomReducer,
});
