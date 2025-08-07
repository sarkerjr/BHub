import { inject, injectable } from 'inversify';
import bcrypt from 'bcrypt';
import { IUserRepository } from '../repositories/user.repository.interface';
import {
  RegisterRequest,
  LoginRequest,
  AuthResponse,
} from '../controllers/auth.controller.interface';
import { generateToken } from '../utils/jwt';
import { TYPES } from '../inversify/types';
import { IAuthService } from './auth.service.interface';

@injectable()
export class AuthService implements IAuthService {
  constructor(
    @inject(TYPES.IUserRepository) private userRepository: IUserRepository
  ) {}

  async register(userData: RegisterRequest): Promise<AuthResponse> {
    const existingUser = await this.userRepository.findByEmail(userData.email);
    if (existingUser) {
      throw new Error('Email already in use');
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(userData.password, saltRounds);

    const user = await this.userRepository.create({
      ...userData,
      password: hashedPassword,
    });

    const token = generateToken(user.id, user.email);

    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
      token,
    };
  }

  async login(credentials: LoginRequest): Promise<AuthResponse> {
    const user = await this.userRepository.findByEmail(credentials.email);
    if (!user) {
      throw new Error('Invalid credentials');
    }

    const isPasswordValid = await this.comparePasswords(
      credentials.password,
      user.password
    );
    if (!isPasswordValid) {
      throw new Error('Invalid credentials');
    }

    const token = generateToken(user.id, user.email);

    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
      token,
    };
  }

  generateToken(userId: number, email: string): string {
    return generateToken(userId, email);
  }

  async comparePasswords(plainText: string, hashed: string): Promise<boolean> {
    return bcrypt.compare(plainText, hashed);
  }
}
