import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const LoginPage = () => {
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();

        // Password validation
        const passwordRegex =
            /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]).{8,}$/;

        if (!passwordRegex.test(password)) {
            setError(
                "Password must be at least 8 characters long and include at least one uppercase letter, one number, and one symbol."
            );
            return;
        }
        setPassword("");
        setError("");

        navigate("/home");
    };

    return (
        <Container className="my-4">
            <div className="d-flex vh-100">
                {/* Left section */}
                <div className="d-flex flex-column justify-content-center align-items-start px-4 px-md-5 w-100 w-md-50">
                    <h3 className="fw-bold">Sign In</h3>
                    <p>
                        New user?{" "}
                        <a href="/signup" className="text-primary text-decoration-none">
                            Create an account
                        </a>
                    </p>

                    <Form autoComplete="off" onSubmit={handleLogin} className="w-100">
                        <Form.Group className="mb-3">
                            <Form.Control
                                type="text"
                                placeholder="User name or email"
                                required
                            // className="form-control"
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Control
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                isInvalid={!!error}
                                className="custom-input"
                            />
                            <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
                        </Form.Group>


                        <Form.Group className="mb-3 d-flex align-items-center">
                            <Form.Check type="checkbox" label="Keep me signed in" />
                        </Form.Group>

                        <Button
                            type="submit"
                            variant="dark"
                            className="w-100 mb-3"
                            style={{ height: "45px" }}
                        >
                            Sign In
                        </Button>

                        <p className="text-center">Or Sign in With</p>
                        <div className="d-flex justify-content-center gap-3">
                            <i className="bi bi-google fs-4"></i>
                            <i className="bi bi-facebook fs-4"></i>
                            <i className="bi bi-linkedin fs-4"></i>
                            <i className="bi bi-twitter fs-4"></i>
                        </div>
                    </Form>
                </div>

                {/* Right section - Hide on small screens */}
                <div className="d-none d-md-flex justify-content-center align-items-center w-50">
                    <img
                        src="https://cdn-icons-png.flaticon.com/512/4140/4140048.png"
                        alt="Illustration"
                        style={{ width: "300px" }}
                    />
                </div>

            </div>
        </Container>
    );
};

export default LoginPage;
