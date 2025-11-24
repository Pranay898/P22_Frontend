import React, { useState } from 'react';
import InvitationService from '../services/invitation.service';

interface Props {
    onClose: () => void;
}

const SendInvitationModal: React.FC<Props> = ({ onClose }) => {
    const [receiverId, setReceiverId] = useState('');
    const [type, setType] = useState('CONNECTION');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        // Note: In a real app, you'd search for users first. 
        // Here we ask for ID for simplicity as per current backend implementation.
        InvitationService.createInvitation(Number(receiverId), type, message)
            .then(() => {
                alert("Invitation sent!");
                onClose();
            })
            .catch(err => {
                alert("Failed to send invitation. Check User ID.");
                setLoading(false);
            });
    };

    return (
        <div className="modal d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content rounded-4">
                    <div className="modal-header border-0">
                        <h5 className="modal-title fw-bold">Send Invitation</h5>
                        <button type="button" className="btn-close" onClick={onClose}></button>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label className="form-label">User ID to Invite</label>
                                <input
                                    type="number"
                                    className="form-control rounded-pill"
                                    value={receiverId}
                                    onChange={e => setReceiverId(e.target.value)}
                                    required
                                    placeholder="Enter User ID (e.g., 2)"
                                />
                                <div className="form-text">Enter the ID of the user you want to invite.</div>
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Type</label>
                                <select
                                    className="form-select rounded-pill"
                                    value={type}
                                    onChange={e => setType(e.target.value)}
                                >
                                    <option value="CONNECTION">Connection Request</option>
                                    <option value="BOARD_COLLAB">Board Collaboration</option>
                                </select>
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Message</label>
                                <textarea
                                    className="form-control rounded-4"
                                    rows={3}
                                    value={message}
                                    onChange={e => setMessage(e.target.value)}
                                    placeholder="Add a personal note..."
                                ></textarea>
                            </div>
                            <button type="submit" className="btn btn-danger w-100 rounded-pill fw-bold" disabled={loading}>
                                {loading ? 'Sending...' : 'Send Invitation'}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SendInvitationModal;
