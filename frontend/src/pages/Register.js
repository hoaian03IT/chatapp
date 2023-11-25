import { useCallback, useEffect, useState } from "react";
import { Button, Form, Image } from "react-bootstrap";
import { AiOutlineEye, AiOutlineEyeInvisible, AiOutlineInfoCircle } from "react-icons/ai";
import logoImage from "../assets/images/pinterest_profile_image.png";

import "../styles/login_register_page.scss";
import { validateInput } from "../utils/validateInput";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { $auth } from "../app/selectors";
import { registerUser } from "../app/api";
import { Loading } from "../components/Loading";
import { pathname } from "../config/pathname";
import { runToast } from "../utils/handleToast";

export const Register = () => {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isValidEmail, setIsValidEmail] = useState(true);
    const [isValidUsername, setIsValidUsername] = useState(true);
    const [isValidPassword, setIsValidPassword] = useState(true);
    const [isValidConfirmPassword, setIsValidConfirmPassword] = useState(true);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { isFetching, messageError, error } = useSelector($auth);

    // notice error after hit register button
    useEffect(() => {
        if (error && messageError === "Email is existed") {
            setIsValidEmail(false);
        }

        if (error && messageError === "Username is existed") {
            setIsValidUsername(false);
        }
    }, [messageError, error]);

    const handlePassword = () => {
        setShowPassword(!showPassword);
    };

    const handleConfirmPassword = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    const handleSubmit = useCallback(
        (e) => {
            e.preventDefault();
            if (!isFetching) {
                const validEmail = validateInput("email", email);
                const validPass = validateInput("password", password);
                const validConfirmPass = password === confirmPassword && confirmPassword;
                const validUsername = username.length > 0;

                if (validEmail && validPass && validConfirmPass && isValidUsername) {
                    // clear error
                    setIsValidEmail(true);
                    setIsValidPassword(true);
                    setIsValidConfirmPassword(true);
                    setIsValidUsername(true);
                    // ---

                    registerUser({ email, username, password }, dispatch, navigate);
                } else {
                    if (!validEmail) {
                        setIsValidEmail(false);
                    } else {
                        setIsValidEmail(true);
                    }

                    if (!validPass) {
                        setIsValidPassword(false);
                    } else {
                        setIsValidPassword(true);
                    }

                    if (!validConfirmPass) {
                        setIsValidConfirmPassword(false);
                    } else {
                        setIsValidConfirmPassword(true);
                    }

                    if (!validUsername) {
                        setIsValidUsername(false);
                    } else {
                        setIsValidUsername(true);
                    }
                    runToast("error", "Register failed");
                }
            }
        },
        [isFetching, email, password, confirmPassword, username, isValidUsername, dispatch, navigate]
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
                <Form.Group className="form-group">
                    <Form.Control
                        className="input input-username"
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Username..."
                        required
                    />
                    {!isValidUsername && <AiOutlineInfoCircle className="icon-issue fs-4" />}
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
                <Form.Group className="form-group confirm-password">
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
                <Button
                    variant="primary"
                    type="submit"
                    className={isFetching ? "submit-btn btn-medium disabled" : "submit-btn btn-medium"}
                    onClick={(e) => handleSubmit(e)}>
                    {isFetching ? <Loading /> : <span>Register</span>}
                </Button>
                <div>
                    Have an account? Go to <Link to={pathname.login}>Login</Link>
                </div>
            </form>
        </section>
    );
};
