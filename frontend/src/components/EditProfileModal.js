import { useRef, useState } from "react";
import { Button, Form, Image, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { TextAreaLimitWord } from "./TextAreaLimitWord";
import { $auth } from "../app/selectors";
import { Loading } from "../components/Loading";
import { updateProfile } from "../app/api";
import { createAxiosRequest } from "../utils/createInstance";

import "../styles/edit_profile_modal.scss";
import { loginSuccess } from "../app/slices/authSlice";
import { useNavigate } from "react-router-dom";

export const EditProfileModal = ({ show, onHide }) => {
    const { currentUser, isFetching } = useSelector($auth);

    const [username] = useState(currentUser?.username);
    const [avatar, setAvatar] = useState(currentUser?.avatar);
    const [bio, setBio] = useState(currentUser?.bio);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const inputFileRef = useRef();

    const handleOpenFileChooser = () => {
        inputFileRef.current.click();
    };

    const handleChooseImage = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onabort = () => console.log("file reading was aborted");
        reader.onerror = () => console.log("file reading has failed");
        reader.onload = () => {
            const binaryStr = reader.result;
            setAvatar(binaryStr);
        };
        reader.readAsDataURL(file);
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        const axiosJWT = createAxiosRequest(currentUser, dispatch, navigate, loginSuccess);
        await updateProfile({ avatar, bio: bio.trim() }, dispatch, axiosJWT);
        setBio(bio.trim());
        onHide();
    };

    const cancelUpdate = () => {
        setAvatar(currentUser?.avatar);
        setBio(currentUser?.bio);
        onHide();
    };

    return (
        <Modal className="edit-profile-modal" show={show} onHide={onHide} size="md" centered>
            <Modal.Header className="header py-2 fs-3 fw-bold d-flex justify-content-center">
                Edit your profile
            </Modal.Header>
            <Modal.Body className="body">
                <form onSubmit={(e) => handleUpdate(e)}>
                    <div className="my-2 text-center">
                        <Image src={avatar} className="avatar-user avatar-huge" onClick={handleOpenFileChooser} />
                        <Form.Control
                            ref={inputFileRef}
                            className="d-none"
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleChooseImage(e)}
                        />
                    </div>
                    <Form.Control className="input-username fw-semibold" type="text" value={username} disabled />
                    <TextAreaLimitWord value={bio} setValue={setBio} positionLimit="right" placeholder="Bio" />
                    <div className="mt-3 d-flex justify-content-center">
                        <Button type="submit" className={isFetching && "disabled"}>
                            {isFetching ? <Loading /> : <span>Update</span>}
                        </Button>
                        <Button variant="link" onClick={cancelUpdate}>
                            Cancel
                        </Button>
                    </div>
                </form>
            </Modal.Body>
        </Modal>
    );
};
