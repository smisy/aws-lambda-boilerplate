import { Inject } from 'typescript-ioc';
import * as mongoose from 'mongoose';

import { ApiHandler, ApiEvent, ApiContext, ApiCallback } from '../../shared/api.interfaces';
import { UserRegisterHandler } from './services/user-register-handler';
import { RegisterInputModel, RegisterOutputModel } from './models/auth-model';
import { ResponseBuilder } from '../../shared/response-builder';

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
    console.log('UserController.registerUser:', userData);
    try {
      userOutput = await this.userRegister.handle(userData);
      return ResponseBuilder.ok<RegisterOutputModel>(userOutput, callback);
    } catch (error) {
      return ResponseBuilder.internalServerError(error, callback);
    }
  }
}

export default AuthController;
