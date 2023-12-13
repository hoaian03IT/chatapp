import { memo, useEffect, useRef, useState } from "react";
import { Modal, Image, FormControl, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { updateRoom } from "../app/api";
import { createAxiosRequest } from "../utils/createInstance";
import { $auth } from "../app/selectors";

import "../styles/edit_room_modal.scss";
import { loginSuccess } from "../app/slices/authSlice";

export const EditRoomModal = memo(({ show, onHide, image, name, idRoom }) => {
    const { currentUser } = useSelector($auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [nameRoom, setRoomName] = useState("");
    const [picRoom, setPicRoom] = useState("");

    const inputFileRef = useRef();

    useEffect(() => {
        image && setPicRoom(image);
        name && setRoomName(name);
    }, [image, name]);

    const handleOpenFileChooser = () => {
        inputFileRef.current.click();
    };

    const handleChangeImage = async (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onabort = () => console.log("file reading was aborted");
        reader.onerror = () => console.log("file reading has failed");
        reader.onload = () => {
            const binary = reader.result;
            setPicRoom(binary);
        };
        reader.readAsDataURL(file);
    };

    const handleChangeRoomName = (e) => {
        const limitCharacters = 50;
        if (nameRoom.length < limitCharacters) {
            setRoomName(e.target.value);
        }
    };

    const handleUpdateRoom = async () => {
        const axiosJWT = createAxiosRequest(currentUser, dispatch, navigate, loginSuccess);
        const payload = { idRoom, picRoom: picRoom, nameRoom: nameRoom };

        try {
            await updateRoom(payload, axiosJWT, dispatch);
            onHide();
        } catch (error) {}
    };

    return (
        <Modal className="edit-room-modal" show={show} onHide={onHide} size="md" centered>
            <Modal.Body className="text-center">
                <Image className="avatar-huge my-2" src={picRoom} onClick={handleOpenFileChooser} />
                <input
                    ref={inputFileRef}
                    className="d-none"
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleChangeImage(e)}
                />
                <FormControl type="text" value={nameRoom} onChange={(e) => handleChangeRoomName(e)} />
                <div>
                    <Button className="mt-2" onClick={handleUpdateRoom}>
                        Update
                    </Button>
                    <Button variant="link" className="mt-2" onClick={onHide}>
                        Cancel
                    </Button>
                </div>
            </Modal.Body>
        </Modal>
    );
});
