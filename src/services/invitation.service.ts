import api from './api';

export interface Invitation {
    id: number;
    sender: {
        id: number;
        fullName: string;
        profilePic?: string;
    };
    type: 'BOARD_COLLAB' | 'CONNECTION';
    status: 'PENDING' | 'ACCEPTED' | 'DECLINED';
    message?: string;
    createdAt: string;
}

class InvitationService {
    getMyInvitations() {
        return api.get<Invitation[]>('/invitations');
    }

    createInvitation(receiverId: number, type: string, message: string, boardId?: number) {
        return api.post('/invitations', { receiverId, type, message, boardId });
    }

    respondToInvitation(id: number, status: 'ACCEPTED' | 'DECLINED') {
        return api.put(`/invitations/${id}/respond`, { status });
    }
}

export default new InvitationService();
