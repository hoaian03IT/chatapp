import { Button, Modal } from "react-bootstrap";
import "../styles/leave_room_modal.scss";

export const LeaveRoomModal = ({ show, onHide }) => {
    const handleLeaveRoom = () => {};
    return (
        <Modal className="leave-room-modal" show={show} onHide={onHide} size="sm" centered>
            <Modal.Body className="body text-center">
                <div>
                    <span className="fs-5">Do you want to leave this room?</span>
                </div>
                <div className="mt-3">
                    <Button onClick={handleLeaveRoom}>Leave</Button>
                    <Button variant="link" onClick={onHide}>
                        Cancel
                    </Button>
                </div>
            </Modal.Body>
        </Modal>
    );
};
