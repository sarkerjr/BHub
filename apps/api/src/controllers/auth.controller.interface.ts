import { Request, Response } from 'express';

export interface IAuthController {
  register(req: Request, res: Response): Promise<void>;
  login(req: Request, res: Response): Promise<void>;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  user: {
    id: number;
    name: string;
    email: string;
  };
  token: string;
}
