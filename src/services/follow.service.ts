import api from './api';
import type { User } from '../types';

class FollowService {
    followUser(userId: number) {
        return api.post(`/users/${userId}/follow`);
    }

    unfollowUser(userId: number) {
        return api.delete(`/users/${userId}/follow`);
    }

    getFollowers(userId: number) {
        return api.get<User[]>(`/users/${userId}/followers`);
    }

    getFollowing(userId: number) {
        return api.get<User[]>(`/users/${userId}/following`);
    }
}

export default new FollowService();
