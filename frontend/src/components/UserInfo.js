import { memo } from "react";
import { Image } from "react-bootstrap";
import { useSelector } from "react-redux";

import { $auth } from "../app/selectors";

// size = {small, medium, large}

export const UserInfo = memo(({ size = "medium", username, avatar, onClick }) => {
    const fontSize = size === "small" ? 6 : size === "medium" ? 5 : size === "large" ? 4 : null;
    const fontSizeClass = fontSize ? "fs-" + fontSize : "";

    const { currentUser } = useSelector($auth);

    return (
        <section className="user-info d-flex align-items-center" onClick={onClick}>
            <Image roundedCircle className={`avatar avatar-${size}`} src={avatar} />
            <span className={`username ms-2 fw-semibold ${fontSizeClass}`}>
                {username === currentUser?.username ? `${username} (You)` : username}
            </span>
        </section>
    );
});
