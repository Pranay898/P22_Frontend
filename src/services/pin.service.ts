import api from './api';
import type { Pin } from '../types';

class PinService {
    getAllPins() {
        return api.get<Pin[]>('/pins');
    }

    getPinById(id: string) {
        return api.get<Pin>(`/pins/${id}`);
    }

    createPin(pin: Partial<Pin>, boardId?: number) {
        return api.post<Pin>(`/pins${boardId ? `?boardId=${boardId}` : ''}`, pin);
    }

    getUserPins(userId: number) {
        return api.get<Pin[]>(`/pins/user/${userId}`);
    }

    searchPins(query: string) {
        return api.get<Pin[]>(`/pins/search?query=${query}`);
    }

    deletePin(id: number) {
        return api.delete(`/pins/${id}`);
    }
}

export default new PinService();
