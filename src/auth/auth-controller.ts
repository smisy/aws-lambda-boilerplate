import { Inject } from 'typescript-ioc';
import * as mongoose from 'mongoose';

import { ApiHandler, ApiEvent, ApiContext, ApiCallback } from '../../shared/api.interfaces';
import { UserRegisterHandler } from './services/user-register-handler';
import { RegisterInputModel, RegisterOutputModel } from './models/auth-model';
import { ResponseBuilder } from '../../shared/response-builder';
import { startMongoose } from '../../shared/mongoose/mongoose';
import { UserDataModel } from '../users/models/user-model';

export class AuthController {
  static connection: mongoose.Mongoose;
  @Inject private userRegister: UserRegisterHandler;
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
}

export default AuthController;
