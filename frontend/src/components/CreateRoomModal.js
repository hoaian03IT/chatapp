import { Button, FormControl, FormGroup, Modal } from "react-bootstrap";
import { PiMagnifyingGlassLight } from "react-icons/pi";
import { IoMdClose, IoMdCloseCircle } from "react-icons/io";
import "../styles/create_room_modal.scss";
import { useId, useState } from "react";

export const CreateRoomModal = ({ show, onHide }) => {
    const [search, setSearch] = useState("");
    const [addedUsers, setAddedUsers] = useState(["andawjng", "thunguyen", "tandat03"]);
    const idInput = useId();

    const handleCreateRoom = () => {
        if (addedUsers.length === 0) alert("A room must include 2 people");
        else {
            alert("Room's created");
            onHide();
            setAddedUsers([]);
        }
    };

    const deleteAddedUser = (username) => {
        const newAddedUser = addedUsers.filter((user) => user !== username);
        setAddedUsers(newAddedUser);
    };

    return (
        <Modal className="create-room-modal" show={show} onHide={onHide} centered size="sm">
            <Modal.Header className="header py-2 fs-3 fw-bold d-flex justify-content-center">Create Room</Modal.Header>
            <Modal.Body className="body">
                <div className="search-box">
                    <FormGroup className="d-flex align-items-center">
                        <label htmlFor={idInput}>
                            <PiMagnifyingGlassLight className="search-icon ms-2 fs-4" />
                        </label>
                        <FormControl
                            id={idInput}
                            className="search-input"
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        {search && <IoMdCloseCircle className="clear-icon mx-2 fs-4" onClick={() => setSearch("")} />}
                    </FormGroup>
                </div>
                <div className="list-added-user p-1 d-flex flex-wrap">
                    {addedUsers.map((user) => (
                        <div key={user} className="added-user m-1 px-1 d-flex align-items-center">
                            <span className="username">{user}</span>{" "}
                            <IoMdClose className="delete-icon ps-1 fs-6" onClick={() => deleteAddedUser(user)} />
                        </div>
                    ))}
                </div>
                <div className="mt-1 text-center">
                    <Button onClick={handleCreateRoom}>Create</Button>
                    <Button variant="link" onClick={onHide}>
                        Cancel
                    </Button>
                </div>
            </Modal.Body>
        </Modal>
    );
};
