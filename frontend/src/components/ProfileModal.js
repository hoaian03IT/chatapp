import { Image, Modal } from "react-bootstrap";
import "../styles/profile_modal.scss";

export const ProfileModal = () => {
    return (
        <Modal className="profile-modal" show={false} size="md" centered>
            <Modal.Header className="header py-2 fs-3 fw-bold d-flex justify-content-center">Profile</Modal.Header>
            <Modal.Body className="body">
                <div className="text-center">
                    <Image
                        className="avatar-huge"
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScQcVv_RC0U40YP7zLNWiV-suOxliPZ0ATPQ&usqp=CAU"
                    />
                </div>
                <p className="username mt-3 fs-3 text-center">{"david"}</p>
                <div className="bio">
                    <p className="bio-title fw-semibold fs-5">Bio:</p>
                    <p className="bio-content">
                        {
                            "Tai vi sao, anh mat kia quay ve us us, la tai aiTai vi sao, anh mat kia quay ve us us, la tai aiTai vi sao, anh mat kia quay ve us us, la tai aiTai vi sao, anh mat kia quay ve us us, la tai aiTai vi sao, anh mat kia quay ve us us, la tai ai"
                        }
                    </p>
                </div>
            </Modal.Body>
        </Modal>
    );
};
