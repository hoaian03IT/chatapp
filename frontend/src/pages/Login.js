import { useCallback, useEffect, useState } from "react";
import { Button, Form, Image } from "react-bootstrap";
import { AiOutlineEye, AiOutlineEyeInvisible, AiOutlineInfoCircle } from "react-icons/ai";
import logoImage from "../assets/images/pinterest_profile_image.png";
import { validateInput } from "../utils/validateInput";
import { Link, useNavigate } from "react-router-dom";

import "../styles/login_register_page.scss";
import { loginUser } from "../app/api";
import { useDispatch, useSelector } from "react-redux";
import { $auth } from "../app/selectors/authSelector";
import { Loading } from "../components/Loading";

export const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [isValidEmail, setIsValidEmail] = useState(true);
    const [isValidPassword, setIsValidPassword] = useState(true);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { isFetching, messageError, error } = useSelector($auth);

    // notice error after hit login button
    useEffect(() => {
        console.log(messageError);
        if (error && messageError === "Email is wrong") setIsValidEmail(false);
        else if (error && messageError === "Password is wrong") setIsValidPassword(false);
    }, [messageError, error]);

    const handlePassword = () => {
        setShowPassword(!showPassword);
    };

    const handleSubmit = useCallback(
        async (e) => {
            e.preventDefault();
            if (!isFetching) {
                const validEmail = validateInput("email", email);
                const validPass = validateInput("password", password);

                if (validEmail && validPass) {
                    setIsValidEmail(true);
                    setIsValidPassword(true);

                    loginUser({ email, password }, dispatch, navigate);
                } else {
                    if (!validEmail) setIsValidEmail(false);
                    else setIsValidEmail(true);

                    if (!validPass) setIsValidPassword(false);
                    else setIsValidPassword(true);
                }
            }
        },
        [dispatch, email, isFetching, navigate, password]
    );

    return (
        <section className="login-page">
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
                <Button
                    variant="primary"
                    type="submit"
                    className={isFetching ? "submit-btn btn-medium disabled" : "submit-btn btn-medium"}
                    onClick={(e) => handleSubmit(e)}>
                    {isFetching ? <Loading /> : <span>Login</span>}
                </Button>
                <div>
                    Don't have an account? <Link to="/chat/register">Register</Link>
                </div>
            </form>
        </section>
    );
};
