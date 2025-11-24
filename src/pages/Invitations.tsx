import React, { useEffect, useState } from 'react';
import InvitationService from '../services/invitation.service';
import type { Invitation } from '../services/invitation.service';

const Invitations: React.FC = () => {
    const [invitations, setInvitations] = useState<Invitation[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadInvitations();
    }, []);

    const loadInvitations = () => {
        InvitationService.getMyInvitations()
            .then(response => {
                setInvitations(response.data.filter(inv => inv.status === 'PENDING'));
                setLoading(false);
            })
            .catch(error => {
                console.error("Error loading invitations", error);
                setLoading(false);
            });
    };

    const handleRespond = (id: number, status: 'ACCEPTED' | 'DECLINED') => {
        InvitationService.respondToInvitation(id, status)
            .then(() => {
                loadInvitations(); // Refresh list
            })
            .catch(error => console.error("Error responding", error));
    };

    if (loading) return <div>Loading invitations...</div>;

    if (invitations.length === 0) return <div className="text-center text-muted mt-4">No pending invitations.</div>;

    return (
        <div className="container mt-4">
            <h4 className="fw-bold mb-4">Inbox</h4>
            <div className="d-flex flex-column gap-3">
                {invitations.map(inv => (
                    <div key={inv.id} className="card border-0 shadow-sm rounded-4 p-3">
                        <div className="d-flex align-items-center justify-content-between">
                            <div className="d-flex align-items-center gap-3">
                                <img
                                    src={inv.sender.profilePic || `https://ui-avatars.com/api/?name=${inv.sender.fullName}&background=random`}
                                    alt={inv.sender.fullName}
                                    className="rounded-circle"
                                    width="50"
                                    height="50"
                                />
                                <div>
                                    <div className="fw-bold">{inv.sender.fullName}</div>
                                    <div className="text-muted small">
                                        {inv.type === 'BOARD_COLLAB' ? 'Invited you to collaborate on a board' : 'Wants to connect with you'}
                                    </div>
                                    {inv.message && <div className="mt-1 fst-italic">"{inv.message}"</div>}
                                </div>
                            </div>
                            <div className="d-flex gap-2">
                                <button className="btn btn-light rounded-pill fw-bold" onClick={() => handleRespond(inv.id, 'DECLINED')}>Decline</button>
                                <button className="btn btn-danger rounded-pill fw-bold" onClick={() => handleRespond(inv.id, 'ACCEPTED')}>Accept</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Invitations;
