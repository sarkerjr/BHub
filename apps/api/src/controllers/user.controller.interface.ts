import { Request, Response } from 'express';

export interface IUserController {
  getAllUsers(req: Request, res: Response): void;
  getUserById(req: Request, res: Response): void;
}
