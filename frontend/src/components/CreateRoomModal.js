import { useContext, useEffect, useId, useState } from "react";
import { Button, FormControl, FormGroup, Image, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { PiMagnifyingGlassLight } from "react-icons/pi";
import { IoMdClose, IoMdCloseCircle } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";

import { useDebounce } from "../hooks";
import { createRoom, findUser } from "../app/api";
import { createAxiosRequest } from "../utils/createInstance";
import { $auth, $room } from "../app/selectors";
import { loginSuccess } from "../app/slices/authSlice";
import { Loading } from "./Loading";
import { SocketContext } from "../pages/Chat";

import "../styles/create_room_modal.scss";

export const CreateRoomModal = ({ show, onHide }) => {
    const [search, setSearch] = useState("");
    const [searchList, setSearchList] = useState([]);
    const [addedUsers, setAddedUsers] = useState([]);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { currentUser } = useSelector($auth);
    const { isFetching } = useSelector($room);
    const { socket } = useContext(SocketContext);

    const debouncedSearch = useDebounce(search, 500);

    const idInput = useId();

    useEffect(() => {
        const fetchUsers = async () => {
            if (debouncedSearch) {
                const listUser = await findUser(debouncedSearch);
                const handledList = listUser.filter((user) => {
                    const hasExist = addedUsers.find((addedUser) => user.username === addedUser.username);
                    return !hasExist && user.username !== currentUser.username;
                });

                setSearchList(handledList);
            } else {
                setSearchList([]);
            }
        };
        fetchUsers();
    }, [debouncedSearch, addedUsers, currentUser?.username]);

    const handleAddUser = (user) => {
        setAddedUsers((prev) => [...prev, { _id: user._id, username: user.username }]);
    };

    const handleCreateRoom = async () => {
        const axiosJWT = createAxiosRequest(currentUser, dispatch, navigate, loginSuccess);
        if (addedUsers.length === 0) alert("You need to add 1 user");
        else {
            const res = await createRoom(dispatch, { addedUsers }, axiosJWT);
            socket.current.emit("create-room", {
                room: res._id,
                addedUsers: addedUsers,
            });
            onHide();
            setAddedUsers([]);
        }
    };

    const deleteAddedUser = (user) => {
        const newAddedUser = addedUsers.filter((addedUser) => addedUser._id !== user._id);
        setAddedUsers(newAddedUser);
    };

    return (
        <Modal className="create-room-modal" show={show} onHide={onHide} centered size="sm">
            <Modal.Header className="header py-2 fs-3 fw-bold d-flex justify-content-center">Create Room</Modal.Header>
            <Modal.Body className="body">
                <div className="search-box position-relative">
                    <FormGroup className="d-flex align-items-center">
                        <label htmlFor={idInput}>
                            <PiMagnifyingGlassLight className="search-icon ms-2 fs-4" />
                        </label>
                        <FormControl
                            name="input"
                            id={idInput}
                            className="search-input"
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            autoComplete="input"
                            autoFocus={true}
                        />
                        {search && <IoMdCloseCircle className="clear-icon mx-2 fs-4" onClick={() => setSearch("")} />}
                        <div className="search-list position-absolute bottom-0 start-0">
                            {searchList.map((user) => (
                                <div
                                    key={user.username}
                                    className="search-item p-2 w-100 d-flex align-items-center"
                                    onClick={() => handleAddUser(user)}>
                                    <Image src={user.avatar} className="avatar avatar-small me-2" />
                                    <span className="username">{user.username}</span>
                                </div>
                            ))}
                        </div>
                    </FormGroup>
                </div>
                <div className="list-added-user p-1 d-flex flex-wrap">
                    {addedUsers.map((user) => (
                        <div key={user._id} className="added-user m-1 px-1 d-flex align-items-center">
                            <span className="username">{user.username}</span>
                            <IoMdClose className="delete-icon ps-1 fs-6" onClick={() => deleteAddedUser(user)} />
                        </div>
                    ))}
                </div>
                <div className="mt-1 text-center">
                    <Button variant="secondary" onClick={handleCreateRoom}>
                        {isFetching ? <Loading /> : <span>Create</span>}
                    </Button>
                    <Button variant="link" onClick={onHide}>
                        Cancel
                    </Button>
                </div>
            </Modal.Body>
        </Modal>
    );
};
