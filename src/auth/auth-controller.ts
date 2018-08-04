import { Inject } from 'typescript-ioc';
import * as mongoose from 'mongoose';

import { ApiHandler, ApiEvent, ApiContext, ApiCallback } from '../../shared/api.interfaces';
import { UserRegisterHandler } from './services/user-register-handler';
import { RegisterInputModel, RegisterOutputModel, LoginInputModel, LoginOutputModel } from './models/auth-model';
import { ResponseBuilder } from '../../shared/response-builder';
import { startMongoose } from '../../shared/mongoose/mongoose';
import { UserDataModel } from '../users/models/user-model';
import { UserLoginHandler } from './services/user-login-handler';

export class AuthController {
  static connection: mongoose.Mongoose;
  @Inject private userRegister: UserRegisterHandler;
  @Inject private userLogin: UserLoginHandler;
  /**
   * @memberof AuthController
   */
  constructor(
    // tslint:disable-next-line:no-empty
  ) {
  }

  /**
   * Register a new user.
   *
   *
   * @returns {RegisterOutputModel}
   * @memberof AuthController
   */
  public registerUser: ApiHandler = async (event: ApiEvent, context: ApiContext, callback: ApiCallback): Promise<void> => {
    const userData: RegisterInputModel = JSON.parse(event.body);
    let userOutput: RegisterOutputModel;
    startMongoose().then(async () => {
      try {
        console.log('UserController.registerUser:', userData);
        userOutput = await this.userRegister.handle(userData);
        console.log('userOutput:', userOutput);
        return ResponseBuilder.ok<UserDataModel>(userOutput.user, callback);
      } catch (error) {
        console.log('Register User Error:', error);
        return ResponseBuilder.unprocessableEntity(error.message, callback);
      }
    });
  }

  /**
   * Log in and generate jwt token.
   *
   *
   * @returns {LoginOutputModel}
   * @memberof AuthController
   */
  public loginUser: ApiHandler = async (event: ApiEvent, context: ApiContext, callback: ApiCallback): Promise<void> => {
    const loginData: LoginInputModel = JSON.parse(event.body);
    let loginOutput: LoginOutputModel;
    startMongoose().then(async () => {
      try {
        console.log('UserController.loginData:', loginData);
        loginOutput = await this.userLogin.handle(loginData);
        console.log('loginOutput:', loginOutput);
        return ResponseBuilder.ok<LoginOutputModel>(loginOutput, callback);
      } catch (error) {
        console.log('Login User Error:', error);
        return ResponseBuilder.unauthorized(error.message, callback);
      }
    });
  }
}

export default AuthController;
