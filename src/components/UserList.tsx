import React from 'react';
import type { User } from '../types';
import { Link } from 'react-router-dom';

interface Props {
    users: User[];
    title: string;
    onClose: () => void;
}

const UserList: React.FC<Props> = ({ users, title, onClose }) => {
    return (
        <div className="modal d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                <div className="modal-content rounded-4">
                    <div className="modal-header border-0">
                        <h5 className="modal-title fw-bold text-center w-100">{title}</h5>
                        <button type="button" className="btn-close" onClick={onClose}></button>
                    </div>
                    <div className="modal-body px-4">
                        {users.length === 0 ? (
                            <div className="text-center text-muted my-4">No users found.</div>
                        ) : (
                            <div className="d-flex flex-column gap-3">
                                {users.map(user => (
                                    <div key={user.id} className="d-flex align-items-center justify-content-between">
                                        <Link to={`/profile/${user.id}`} className="d-flex align-items-center gap-2 text-decoration-none text-dark" onClick={onClose}>
                                            <img
                                                src={user.profilePic || `https://ui-avatars.com/api/?name=${user.fullName}&background=random`}
                                                alt={user.fullName}
                                                className="rounded-circle"
                                                width="48"
                                                height="48"
                                            />
                                            <span className="fw-bold">{user.fullName}</span>
                                        </Link>
                                        <button className="btn btn-light rounded-pill fw-bold">Follow</button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserList;
