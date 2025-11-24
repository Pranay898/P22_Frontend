import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PinService from '../services/pin.service';
import FollowService from '../services/follow.service';
import type { Pin } from '../types';
import { FaArrowLeft, FaEllipsisH, FaShare, FaDownload } from 'react-icons/fa';

const PinDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [pin, setPin] = useState<Pin | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (id) {
            PinService.getPinById(id)
                .then((response) => {
                    setPin(response.data);
                    setLoading(false);
                })
                .catch((error) => {
                    console.error("Error fetching pin:", error);
                    setLoading(false);
                });
        }
    }, [id]);

    const handleShare = () => {
        navigator.clipboard.writeText(window.location.href);
        alert('Link copied to clipboard!');
    };

    const handleSave = () => {
        // Placeholder for save functionality
        alert('Pin saved!');
    };

    const handleFollow = () => {
        if (pin && pin.user) {
            FollowService.followUser(pin.user.id)
                .then(() => alert(`Followed ${pin.user!.fullName}`))
                .catch(err => alert("Error following user (maybe you already follow them?)"));
        }
    };

    if (loading) {
        return <div className="text-center mt-5"><div className="spinner-border text-danger" role="status"></div></div>;
    }

    if (!pin) {
        return <div className="text-center mt-5">Pin not found</div>;
    }

    return (
        <div className="container mt-4 mb-5" style={{ maxWidth: '1000px' }}>
            <button onClick={() => navigate(-1)} className="btn btn-light rounded-circle mb-3 d-md-none">
                <FaArrowLeft />
            </button>

            <div className="card border-0 shadow-sm rounded-5 overflow-hidden" style={{ minHeight: '600px' }}>
                <div className="row g-0 h-100">
                    {/* Left Side - Image */}
                    <div className="col-md-6 bg-light d-flex align-items-center justify-content-center">
                        <img
                            src={pin.imageUrl}
                            alt={pin.title}
                            className="img-fluid"
                            style={{ maxHeight: '80vh', objectFit: 'contain', width: '100%' }}
                        />
                    </div>

                    {/* Right Side - Details */}
                    <div className="col-md-6 p-4 p-md-5 d-flex flex-column">
                        <div className="d-flex justify-content-between align-items-center mb-4">
                            <div className="d-flex gap-2">
                                <button className="btn btn-light rounded-circle p-2"><FaEllipsisH /></button>
                                <button className="btn btn-light rounded-circle p-2" onClick={handleShare}><FaShare /></button>
                                <button className="btn btn-light rounded-circle p-2"><FaDownload /></button>
                            </div>
                            <button className="btn btn-danger rounded-pill px-4 fw-bold" onClick={handleSave}>Save</button>
                        </div>

                        <h1 className="fw-bold mb-3">{pin.title}</h1>
                        <p className="text-muted mb-4" style={{ fontSize: '1.1rem' }}>{pin.description}</p>

                        {pin.isSponsored && (
                            <div className="mb-3">
                                <span className="badge bg-secondary">Sponsored</span>
                                {pin.promotionUrl && <a href={pin.promotionUrl} className="ms-2 text-decoration-none" target="_blank" rel="noreferrer">Visit Site</a>}
                            </div>
                        )}

                        {pin.user && (
                            <div className="d-flex align-items-center justify-content-between mb-4 p-2 rounded-pill hover-bg-light">
                                <div className="d-flex align-items-center gap-2">
                                    <img
                                        src={pin.user.profilePic || `https://ui-avatars.com/api/?name=${pin.user.fullName}&background=random`}
                                        alt={pin.user.fullName}
                                        className="rounded-circle"
                                        width="48"
                                        height="48"
                                    />
                                    <div>
                                        <div className="fw-bold">{pin.user.fullName}</div>
                                        <small className="text-muted">10 followers</small>
                                    </div>
                                </div>
                                <button className="btn btn-light rounded-pill fw-bold" onClick={handleFollow}>Follow</button>
                            </div>
                        )}

                        <div className="mt-auto">
                            <h5 className="fw-bold mb-3">Comments</h5>
                            <div className="d-flex gap-2 align-items-center">
                                <div className="bg-light rounded-circle d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px' }}>
                                    <span className="fw-bold text-muted">U</span>
                                </div>
                                <input
                                    type="text"
                                    className="form-control rounded-pill bg-light border-0 py-2"
                                    placeholder="Add a comment"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PinDetail;
