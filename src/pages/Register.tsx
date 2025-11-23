import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import AuthService from '../services/auth.service';
import { FaPinterest } from 'react-icons/fa';

const Register: React.FC = () => {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [successful, setSuccessful] = useState(false);
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleRegister = (e: React.FormEvent) => {
        e.preventDefault();
        setMessage('');
        setSuccessful(false);

        AuthService.register(fullName, email, password).then(
            (response) => {
                setMessage(response.data.message);
                setSuccessful(true);
                setTimeout(() => {
                    navigate('/login');
                }, 2000);
            },
            (error) => {
                const resMessage =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();

                setMessage(resMessage);
                setSuccessful(false);
            }
        );
    };

    return (
        <div className="container d-flex justify-content-center align-items-center vh-100">
            <div className="card border-0 shadow-sm p-4 text-center" style={{ maxWidth: '400px', width: '100%', borderRadius: '32px' }}>
                <div className="mb-3">
                    <FaPinterest size={48} className="text-danger" />
                </div>
                <h2 className="mb-2 fw-bold">Welcome to Pinterest</h2>
                <p className="text-muted mb-4">Find new ideas to try</p>

                <form onSubmit={handleRegister}>
                    {!successful && (
                        <>
                            <div className="form-floating mb-3">
                                <input
                                    type="text"
                                    className="form-control rounded-pill"
                                    id="fullName"
                                    placeholder="Full Name"
                                    value={fullName}
                                    onChange={(e) => setFullName(e.target.value)}
                                    required
                                />
                                <label htmlFor="fullName">Full Name</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input
                                    type="email"
                                    className="form-control rounded-pill"
                                    id="email"
                                    placeholder="name@example.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                                <label htmlFor="email">Email address</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input
                                    type="password"
                                    className="form-control rounded-pill"
                                    id="password"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    minLength={6}
                                />
                                <label htmlFor="password">Password</label>
                            </div>
                        </>
                    )}

                    {message && (
                        <div className={successful ? "alert alert-success" : "alert alert-danger"} role="alert">
                            {message}
                        </div>
                    )}

                    {!successful && (
                        <button className="btn btn-danger w-100 rounded-pill fw-bold py-2 mb-3">
                            Continue
                        </button>
                    )}

                    <div className="text-muted small">
                        By continuing, you agree to Pinterest's Terms of Service and acknowledge you've read our Privacy Policy.
                    </div>

                    <hr />

                    <Link to="/login" className="btn btn-light w-100 rounded-pill fw-bold py-2">
                        Already a member? Log in
                    </Link>
                </form>
            </div>
        </div>
    );
};

export default Register;
