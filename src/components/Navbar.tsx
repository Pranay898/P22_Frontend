import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthService from '../services/auth.service';
import { FaPinterest, FaSearch, FaUserCircle } from 'react-icons/fa';
import type { User } from '../types';

const Navbar: React.FC = () => {
    const [currentUser, setCurrentUser] = useState<User | undefined>(undefined);
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const user = AuthService.getCurrentUser();
        if (user) {
            setCurrentUser(user);
        }
    }, []);

    const logOut = () => {
        AuthService.logout();
        setCurrentUser(undefined);
        navigate('/login');
    };

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/?search=${searchQuery}`);
        }
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-white fixed-top shadow-sm">
            <div className="container-fluid">
                <Link className="navbar-brand text-danger" to="/">
                    <FaPinterest size={32} />
                </Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link active fw-bold" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link fw-bold" to="/create">Create</Link>
                        </li>
                    </ul>

                    <form className="d-flex flex-grow-1 mx-4" onSubmit={handleSearch}>
                        <div className="input-group">
                            <span className="input-group-text bg-light border-0 rounded-start-pill pl-3">
                                <FaSearch className="text-muted" />
                            </span>
                            <input
                                className="form-control bg-light border-0 rounded-end-pill"
                                type="search"
                                placeholder="Search"
                                aria-label="Search"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                    </form>

                    <ul className="navbar-nav ms-auto align-items-center">
                        {currentUser ? (
                            <>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/profile">
                                        <FaUserCircle size={28} className="text-secondary" />
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <button className="btn btn-sm btn-secondary rounded-pill ms-2" onClick={logOut}>
                                        LogOut
                                    </button>
                                </li>
                            </>
                        ) : (
                            <>
                                <li className="nav-item">
                                    <Link className="btn btn-danger rounded-pill me-2" to="/login">Log in</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="btn btn-light rounded-pill bg-light" to="/register">Sign up</Link>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
