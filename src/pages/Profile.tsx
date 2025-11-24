import React, { useState, useEffect } from 'react';
import AuthService from '../services/auth.service';
import PinService from '../services/pin.service';
import FollowService from '../services/follow.service';
import MasonryGrid from '../components/MasonryGrid';
import UserList from '../components/UserList';
import Invitations from './Invitations';
import type { User, Pin } from '../types';
import { FaUserCircle } from 'react-icons/fa';
import SendInvitationModal from '../components/SendInvitationModal';

const Profile: React.FC = () => {
    const [currentUser, setCurrentUser] = useState<User | undefined>(undefined);
    const [pins, setPins] = useState<Pin[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState<'created' | 'saved' | 'invitations'>('created');

    const [followers, setFollowers] = useState<User[]>([]);
    const [following, setFollowing] = useState<User[]>([]);
    const [showFollowersModal, setShowFollowersModal] = useState(false);
    const [showFollowingModal, setShowFollowingModal] = useState(false);
    const [showInviteModal, setShowInviteModal] = useState(false);

    useEffect(() => {
        const user = AuthService.getCurrentUser();
        if (user) {
            setCurrentUser(user);

            // Fetch Pins
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

            // Fetch Followers/Following
            FollowService.getFollowers(user.id).then(res => setFollowers(res.data));
            FollowService.getFollowing(user.id).then(res => setFollowing(res.data));

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
                <div className="position-relative d-inline-block">
                    {currentUser.profilePic ? (
                        <img src={currentUser.profilePic} alt={currentUser.fullName} className="rounded-circle mb-3" width="120" height="120" />
                    ) : (
                        <FaUserCircle size={120} className="text-secondary mb-3" />
                    )}
                    {currentUser.accountType === 'BUSINESS' && (
                        <span className="position-absolute bottom-0 end-0 badge rounded-pill bg-primary border border-white">
                            Business
                        </span>
                    )}
                </div>
                <h1 className="fw-bold">{currentUser.fullName}</h1>
                <p className="text-muted">@{currentUser.email.split('@')[0]}</p>

                <div className="d-flex justify-content-center gap-3 mb-3">
                    <span className="fw-bold cursor-pointer" onClick={() => setShowFollowersModal(true)} style={{ cursor: 'pointer' }}>
                        {followers.length} <span className="text-muted fw-normal">followers</span>
                    </span>
                    <span className="fw-bold cursor-pointer" onClick={() => setShowFollowingModal(true)} style={{ cursor: 'pointer' }}>
                        {following.length} <span className="text-muted fw-normal">following</span>
                    </span>
                </div>

                {currentUser.websiteUrl && (
                    <a href={currentUser.websiteUrl} target="_blank" rel="noopener noreferrer" className="btn btn-light rounded-pill fw-bold mb-3">
                        Visit Website
                    </a>
                )}

                <div className="mt-3 d-flex justify-content-center gap-2">
                    <button className="btn btn-light rounded-pill fw-bold px-4" onClick={() => setShowInviteModal(true)}>
                        Invite User
                    </button>
                    <button className="btn btn-light rounded-pill fw-bold px-4" onClick={() => {
                        navigator.clipboard.writeText(window.location.href);
                        alert('Profile link copied to clipboard!');
                    }}>Share</button>
                    <button className="btn btn-light rounded-pill fw-bold px-4" onClick={() => {
                        const newName = prompt("Enter new name:", currentUser.fullName);
                        if (newName) {
                            alert("Name update functionality would go here. Backend API needed.");
                        }
                    }}>Edit Profile</button>
                </div>
            </div>

            <div className="text-center mb-4">
                <button
                    className={`btn rounded-pill fw-bold mx-2 ${activeTab === 'created' ? 'btn-dark' : 'btn-light'}`}
                    onClick={() => setActiveTab('created')}
                >
                    Created
                </button>
                <button
                    className={`btn rounded-pill fw-bold mx-2 ${activeTab === 'saved' ? 'btn-dark' : 'btn-light'}`}
                    onClick={() => setActiveTab('saved')}
                >
                    Saved
                </button>
                <button
                    className={`btn rounded-pill fw-bold mx-2 ${activeTab === 'invitations' ? 'btn-dark' : 'btn-light'}`}
                    onClick={() => setActiveTab('invitations')}
                >
                    Invitations
                </button>
            </div>

            {loading ? (
                <div className="text-center">
                    <div className="spinner-border text-danger" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            ) : (
                <>
                    {activeTab === 'invitations' ? (
                        <Invitations />
                    ) : (
                        pins.length === 0 ? (
                            <div className="text-center mt-4">
                                <p>You haven't {activeTab} any pins yet.</p>
                            </div>
                        ) : (
                            <MasonryGrid pins={pins} />
                        )
                    )}
                </>
            )}

            {showFollowersModal && (
                <UserList users={followers} title="Followers" onClose={() => setShowFollowersModal(false)} />
            )}
            {showFollowingModal && (
                <UserList users={following} title="Following" onClose={() => setShowFollowingModal(false)} />
            )}
            {showInviteModal && (
                <SendInvitationModal onClose={() => setShowInviteModal(false)} />
            )}
        </div>
    );
};

export default Profile;
