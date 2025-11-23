import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import AuthService from '../services/auth.service';
import { FaPinterest } from 'react-icons/fa';

const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        setMessage('');
        setLoading(true);

        AuthService.login(email, password).then(
            () => {
                navigate('/');
                window.location.reload();
            },
            (error) => {
                const resMessage =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();

                setLoading(false);
                setMessage(resMessage);
            }
        );
    };

    return (
        <div className="container d-flex justify-content-center align-items-center vh-100">
            <div className="card border-0 shadow-sm p-4 text-center" style={{ maxWidth: '400px', width: '100%', borderRadius: '32px' }}>
                <div className="mb-3">
                    <FaPinterest size={48} className="text-danger" />
                </div>
                <h2 className="mb-4 fw-bold">Welcome to Pinterest</h2>
                <form onSubmit={handleLogin}>
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
                        />
                        <label htmlFor="password">Password</label>
                    </div>

                    {message && (
                        <div className="alert alert-danger" role="alert">
                            {message}
                        </div>
                    )}

                    <button className="btn btn-danger w-100 rounded-pill fw-bold py-2 mb-3" disabled={loading}>
                        {loading ? 'Logging in...' : 'Log in'}
                    </button>

                    <div className="text-muted small">
                        By continuing, you agree to Pinterest's Terms of Service and acknowledge you've read our Privacy Policy.
                    </div>

                    <hr />

                    <Link to="/register" className="btn btn-light w-100 rounded-pill fw-bold py-2">
                        Not on Pinterest yet? Sign up
                    </Link>
                </form>
            </div>
        </div>
    );
};

export default Login;
