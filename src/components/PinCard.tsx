import React from 'react';
import { Link } from 'react-router-dom';
import type { Pin } from '../types';

interface Props {
    pin: Pin;
}

const PinCard: React.FC<Props> = ({ pin }) => {
    return (
        <div className="card border-0 mb-3 pin-card">
            <div className="position-relative">
                <Link to={`/pin/${pin.id}`}>
                    <img src={pin.imageUrl} className="card-img-top rounded-4" alt={pin.title} style={{ width: '100%', display: 'block' }} />
                    <div className="card-img-overlay d-flex flex-column justify-content-between opacity-0 hover-overlay p-3">
                        <div className="d-flex justify-content-end">
                            <button className="btn btn-danger rounded-pill fw-bold px-3" onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                alert('Pin saved!');
                            }}>Save</button>
                        </div>
                        <div className="d-flex justify-content-between align-items-center">
                            {/* Bottom actions like share/link could go here */}
                        </div>
                    </div>
                </Link>
            </div>
            <div className="card-body p-1">
                <h6 className="card-title fw-bold text-truncate">{pin.title}</h6>
                {pin.isSponsored ? (
                    <div className="d-flex align-items-center">
                        <small className="text-muted fw-bold">Sponsored</small>
                    </div>
                ) : (
                    pin.user && (
                        <div className="d-flex align-items-center">
                            <small className="text-muted">{pin.user.fullName}</small>
                        </div>
                    )
                )}
            </div>
        </div>
    );
};

export default PinCard;
