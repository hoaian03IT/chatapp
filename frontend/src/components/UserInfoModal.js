import { memo, useEffect, useState } from "react";
import { Modal, Image, Button } from "react-bootstrap";

import "../styles/user_info_modal.scss";
import { addFriend, unfriendApi } from "../app/api";

export const UserInfoModal = memo(({ username, bio, avatar, _id, isFriend, show, onHide, axiosJWT }) => {
    const [isFriendState, setIsFriendState] = useState();

    const handleAddFriend = async () => {
        try {
            setIsFriendState(true);
            await addFriend(_id, axiosJWT);
        } catch (error) {}
    };
    const handleUnFriend = async () => {
        try {
            setIsFriendState(false);
            await unfriendApi(_id, axiosJWT);
        } catch (error) {}
    };

    useEffect(() => {
        setIsFriendState(isFriend);
    }, [isFriend, show]);

    return (
        <Modal className="user-info-modal" show={show} onHide={onHide} centered size="sm">
            <Modal.Body>
                <div className="avatar text-center mb-2">
                    <Image className="avatar-huge" src={avatar} />
                </div>
                <div className="username text-center mb-2">
                    <h2 className="text">{username}</h2>
                </div>

                <div className="bio mb-2 text-center">
                    <strong>Bio:</strong>
                    <p className="text">{bio ? bio : "None"}</p>
                </div>

                <div className="text-center">
                    <Button
                        className="mx-auto"
                        variant={isFriendState ? "danger" : "secondary"}
                        onClick={isFriendState ? handleUnFriend : handleAddFriend}>
                        {isFriendState ? "Unfriend" : "Add friend"}
                    </Button>
                </div>
            </Modal.Body>
        </Modal>
    );
});
