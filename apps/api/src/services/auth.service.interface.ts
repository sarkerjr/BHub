import { RegisterRequest, LoginRequest, AuthResponse } from '../controllers/auth.controller.interface';

export interface IAuthService {
  register(userData: RegisterRequest): Promise<AuthResponse>;
  login(credentials: LoginRequest): Promise<AuthResponse>;
  generateToken(userId: number, email: string): string;
  comparePasswords(plainText: string, hashed: string): Promise<boolean>;
}
