import { useContext, useEffect, useRef, useState } from "react";
import { Button, Form, Image, Modal } from "react-bootstrap";
import { ProviderContext } from "./Provider";
import { TextAreaLimitWord } from "./TextAreaLimitWord";

import "../styles/edit_profile_modal.scss";

export const EditProfileModal = ({ show, onHide }) => {
    const { username, avatar, bio, setBio, setAvatar } = useContext(ProviderContext);
    const [image, setImage] = useState(avatar);
    const [newBio, setNewBio] = useState(bio);

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
            setImage(binaryStr);
        };
        reader.readAsDataURL(file);
    };

    // useEffect(() => console.log(base64), [base64]);

    const handleUpdate = (e) => {
        e.preventDefault();
        if (newBio !== bio) setBio(newBio);
        if (avatar !== image) setAvatar(image);
        alert("Uploaded");
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
                        <Image
                            src={image || avatar}
                            className="avatar-user avatar-huge"
                            onClick={handleOpenFileChooser}
                        />
                        <Form.Control
                            ref={inputFileRef}
                            className="d-none"
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleChooseImage(e)}
                        />
                    </div>
                    <Form.Control className="input-username fw-semibold" type="text" value={username} disabled />
                    <TextAreaLimitWord value={newBio} setValue={setNewBio} positionLimit="right" placeholder="Bio" />
                    <div className="mt-3 d-flex justify-content-center">
                        <Button type="submit">Update</Button>
                        <Button variant="link" onClick={onHide}>
                            Cancel
                        </Button>
                    </div>
                </form>
            </Modal.Body>
        </Modal>
    );
};
