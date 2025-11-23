import api from './api';
import type { AuthResponse } from '../types';

class AuthService {
    login(email: string, password: string) {
        return api
            .post<AuthResponse>('/auth/signin', {
                email,
                password,
            })
            .then((response) => {
                if (response.data.token) {
                    localStorage.setItem('user', JSON.stringify(response.data));
                }
                return response.data;
            });
    }

    logout() {
        localStorage.removeItem('user');
    }

    register(fullName: string, email: string, password: string) {
        return api.post('/auth/signup', {
            fullName,
            email,
            password,
        });
    }

    getCurrentUser() {
        const userStr = localStorage.getItem('user');
        if (userStr) return JSON.parse(userStr);
        return null;
    }
}

export default new AuthService();
