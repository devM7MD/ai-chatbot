export interface User {
    id: number;
    username: string;
    email: string;
    createdAt: string;
}

export interface LoginCredentials {
    email: string;
    password: string;
}

export interface RegisterData {
    username: string;
    email: string;
    password: string;
}

export interface AuthResponse {
    success: boolean;
    message: string;
    user?: User;
    token?: string;
}
