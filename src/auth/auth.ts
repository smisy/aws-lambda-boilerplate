import AuthController from './auth-controller';
import { ApiHandler } from '../../shared/api.interfaces';
import { startMongoose } from '../../shared/mongoose/mongoose';

startMongoose().then((err) => {
  console.log('Start Mongoose Error:', err);
});

const authController: AuthController = new AuthController();
export const register: ApiHandler = authController.registerUser;
