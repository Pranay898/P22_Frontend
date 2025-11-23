import React, { useState, useEffect } from 'react';
import AuthService from '../services/auth.service';
import PinService from '../services/pin.service';
import MasonryGrid from '../components/MasonryGrid';
import type { User, Pin } from '../types';
import { FaUserCircle } from 'react-icons/fa';

const Profile: React.FC = () => {
    const [currentUser, setCurrentUser] = useState<User | undefined>(undefined);
    const [pins, setPins] = useState<Pin[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const user = AuthService.getCurrentUser();
        if (user) {
            setCurrentUser(user);
            PinService.getUserPins(user.id).then(
                (response) => {
                    setPins(response.data);
                    setLoading(false);
                },
                (error) => {
                    console.error(error);
                    setLoading(false);
                }
            );
        } else {
            setLoading(false);
        }
    }, []);

    if (!currentUser) {
        return <div className="container mt-5 pt-5 text-center">Please log in to view profile.</div>;
    }

    return (
        <div className="container mt-5 pt-5">
            <div className="text-center mb-5">
                {currentUser.profilePic ? (
                    <img src={currentUser.profilePic} alt={currentUser.fullName} className="rounded-circle mb-3" width="120" height="120" />
                ) : (
                    <FaUserCircle size={120} className="text-secondary mb-3" />
                )}
                <h1 className="fw-bold">{currentUser.fullName}</h1>
                <p className="text-muted">@{currentUser.email.split('@')[0]}</p>
                <div className="mt-3">
                    <button className="btn btn-light rounded-pill fw-bold mx-1">Share</button>
                    <button className="btn btn-light rounded-pill fw-bold mx-1">Edit Profile</button>
                </div>
            </div>

            <div className="text-center mb-4">
                <button className="btn btn-dark rounded-pill fw-bold mx-2">Created</button>
                <button className="btn btn-light rounded-pill fw-bold mx-2">Saved</button>
            </div>

            {loading ? (
                <div className="text-center">
                    <div className="spinner-border text-danger" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            ) : (
                <>
                    {pins.length === 0 ? (
                        <div className="text-center mt-4">
                            <p>You haven't created any pins yet.</p>
                        </div>
                    ) : (
                        <MasonryGrid pins={pins} />
                    )}
                </>
            )}
        </div>
    );
};

export default Profile;
