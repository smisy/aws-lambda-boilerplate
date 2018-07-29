import AuthController from './auth-controller';
import { ApiHandler } from '../../shared/api.interfaces';

const authController: AuthController = new AuthController();
export const register: ApiHandler = authController.registerUser;
