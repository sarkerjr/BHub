import { Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import { RegisterRequest, LoginRequest } from './auth.controller.interface';
import { TYPES } from '../inversify/types';
import { IAuthService } from '../services/auth.service.interface';

@injectable()
export class AuthController {
  constructor(@inject(TYPES.IAuthService) private authService: IAuthService) {}

  public register = async (req: Request, res: Response): Promise<void> => {
    try {
      const userData: RegisterRequest = req.body;
      const result = await this.authService.register(userData);

      res.status(201).json({
        success: true,
        data: result,
      });
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Registration failed';
      res.status(400).json({
        success: false,
        message,
      });
    }
  };

  public login = async (req: Request, res: Response): Promise<void> => {
    try {
      const credentials: LoginRequest = req.body;
      const result = await this.authService.login(credentials);

      res.status(200).json({
        success: true,
        data: result,
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Login failed';
      res.status(401).json({
        success: false,
        message,
      });
    }
  };
}
