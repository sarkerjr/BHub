import { Request, Response } from 'express';
import { IUserController } from './user.controller.interface';
import { injectable, inject } from 'inversify';
import { TYPES } from '../inversify/types';
import { IUserService } from '../services/user.service.interface';

@injectable()
export class UserController implements IUserController {
  constructor(@inject(TYPES.IUserService) private userService: IUserService) {}

  async getAllUsers(req: Request, res: Response): Promise<void> {
    const users = await this.userService.getUsers();
    res.json(users);
  }

  async getUserById(req: Request, res: Response): Promise<void> {
    const user = await this.userService.getUser(Number(req.params.id));
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  }
}
