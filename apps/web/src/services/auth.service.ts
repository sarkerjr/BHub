import apiClient from '@/lib/api';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  success: boolean;
  data: {
    user: {
      id: number;
      name: string;
      email: string;
    };
    token: string;
  };
}

export const AuthService = {
  async login(loginRequest: LoginRequest): Promise<AuthResponse> {
    try {
      const response = await apiClient.post<AuthResponse>(
        '/auth/login',
        loginRequest
      );
      return response;
    } catch (error) {
      console.error('Error logging in:', error);
      throw error;
    }
  },
};

export default AuthService;
