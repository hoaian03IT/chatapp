import { useCallback, useState } from "react";
import { Button, Form, Image } from "react-bootstrap";
import { AiOutlineEye, AiOutlineEyeInvisible, AiOutlineInfoCircle } from "react-icons/ai";
import logoImage from "../assets/images/pinterest_profile_image.png";

import "../styles/login_register_page.scss";
import { validateInput } from "../utils/validateInput";
import { Link } from "react-router-dom";

export const Register = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isValidEmail, setIsValidEmail] = useState(true);
    const [isValidPassword, setIsValidPassword] = useState(true);
    const [isValidConfirmPassword, setIsValidConfirmPassword] = useState(true);

    const handlePassword = () => {
        setShowPassword(!showPassword);
    };

    const handleConfirmPassword = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    const handleSubmit = useCallback(
        (e) => {
            e.preventDefault();
            const validEmail = validateInput("email", email);
            const validPass = validateInput("password", password);
            const validConfirmPass = password === confirmPassword && confirmPassword;

            if (validEmail && validPass && validConfirmPass) {
                setIsValidEmail(true);
                setIsValidPassword(true);
                setIsValidConfirmPassword(true);
                console.log("sending request...");
            } else {
                if (!validEmail) setIsValidEmail(false);
                else setIsValidEmail(true);

                if (!validPass) setIsValidPassword(false);
                else setIsValidPassword(true);

                if (!validConfirmPass) setIsValidConfirmPassword(false);
                else setIsValidConfirmPassword(true);
            }
        },
        [email, password, confirmPassword]
    );

    return (
        <section className="register-page">
            <form className="form text-center">
                <div className="logo-image">
                    <Image className="logo" src={logoImage} />
                </div>
                <Form.Group className="form-group">
                    <Form.Control
                        className="input input-email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email..."
                        required
                    />
                    {!isValidEmail && <AiOutlineInfoCircle className="icon-issue fs-4" />}
                </Form.Group>
                <Form.Group className="form-group password">
                    <Form.Control
                        className="input input-password"
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password..."
                        required
                    />

                    {!isValidPassword && <AiOutlineInfoCircle className="icon-issue fs-4" />}

                    {showPassword ? (
                        <AiOutlineEye className="icon-password fs-4" onClick={handlePassword} />
                    ) : (
                        <AiOutlineEyeInvisible className="icon-password fs-4" onClick={handlePassword} />
                    )}
                </Form.Group>
                <Form.Group className="form-group password">
                    <Form.Control
                        className="input input-password"
                        type={showConfirmPassword ? "text" : "password"}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Confirm password   ..."
                        required
                    />

                    {!isValidConfirmPassword && <AiOutlineInfoCircle className="icon-issue fs-4" />}

                    {showConfirmPassword ? (
                        <AiOutlineEye className="icon-password fs-4" onClick={handleConfirmPassword} />
                    ) : (
                        <AiOutlineEyeInvisible className="icon-password fs-4" onClick={handleConfirmPassword} />
                    )}
                </Form.Group>
                <Button variant="primary" type="submit" className="submit-btn" onClick={(e) => handleSubmit(e)}>
                    Register
                </Button>
                <div>
                    Have an account? Go to <Link to="/chat/login">Login</Link>
                </div>
            </form>
        </section>
    );
};
