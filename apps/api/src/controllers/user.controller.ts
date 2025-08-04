import { Request, Response } from 'express';
import { IUserController } from './user.controller.interface';
import { injectable, inject } from 'inversify';
import { TYPES } from '../inversify/types';
import { IUserService } from '../services/user.service.interface';

@injectable()
export class UserController implements IUserController {
  constructor(@inject(TYPES.IUserService) private userService: IUserService) {}

  getAllUsers(req: Request, res: Response): void {
    const users = this.userService.getUsers();
    res.json(users);
  }

  getUserById(req: Request, res: Response): void {
    const user = this.userService.getUser(Number(req.params.id));
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  }
}
