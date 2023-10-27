import { Image } from "react-bootstrap";

// size = {small, medium, large}

export const UserInfo = ({ size = "medium", username, avatar, onClick }) => {
    const fontSize = size === "small" ? 6 : size === "medium" ? 5 : size === "large" ? 4 : null;
    const fontSizeClass = fontSize ? "fs-" + fontSize : "";

    return (
        <section className="user-info d-flex align-items-center" onClick={onClick}>
            <Image className={`avatar avatar-${size}`} src={avatar} />
            <span className={`username ms-2 fw-semibold ${fontSizeClass}`}>{username}</span>
        </section>
    );
};
