import { memo } from "react";
import { Modal, Image, Button } from "react-bootstrap";

export const UserInfoModal = memo(({ username, bio, avatar }) => {
    return (
        <Modal centered size="sm">
            <Modal.Body>
                <Image src={avatar} />
                <h2>{username}</h2>
                <p>{bio}</p>
                <Button variant="secondary">Add friends</Button>
            </Modal.Body>
        </Modal>
    );
});
