import { Inject } from 'typescript-ioc';
import * as mongoose from 'mongoose';

// import { UserRegisterHandler } from './services/user-register-handler';
import { LoginInputModel, LoginOutputModel, RegisterInputModel, RegisterOutputModel } from './models/auth-model';
import { ResponseBuilder } from '../../shared/response-builder';
import { startMongoose } from '../../shared/mongoose/mongoose';
import { UserLoginHandler } from './services/user-login-handler';
import { APIGatewayProxyHandler, APIGatewayProxyEvent, Context, APIGatewayProxyResult } from 'aws-lambda';
import { UserRegisterHandler } from './services/user-register-handler';

export class AuthController {
  static connection: mongoose.Mongoose;
  @Inject private userRegister: UserRegisterHandler;
  @Inject private userLogin: UserLoginHandler;
  // @Inject private userAuthorizer: UserAuthorizerHandler;

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
  public registerUser: APIGatewayProxyHandler = async (
    event: APIGatewayProxyEvent,
    context: Context): Promise<APIGatewayProxyResult> => {
    const userData: RegisterInputModel = JSON.parse(event.body);
    let userOutput: RegisterOutputModel;
    await startMongoose();
    try {
      console.log('UserController.registerUser:', userData);
      userOutput = await this.userRegister.handle(userData);
      console.log('userOutput:', userOutput);
      return ResponseBuilder.ok(userOutput.user);
    } catch (error) {
      console.log('Register User Error:', error);
      return ResponseBuilder.unprocessableEntity(error.message);
    }
  }

  /**
   * Log in and generate jwt token.
   *
   *
   * @returns {LoginOutputModel}
   * @memberof AuthController
   */
  public loginUser: APIGatewayProxyHandler = async (
    event: APIGatewayProxyEvent,
    context: Context): Promise<APIGatewayProxyResult> => {
    const loginData: LoginInputModel = JSON.parse(event.body);
    let loginOutput: LoginOutputModel;
    await startMongoose();
    try {
      console.log('UserController.loginData:', loginData);
      loginOutput = await this.userLogin.handle(loginData);
      console.log('loginOutput:', loginOutput);
      return ResponseBuilder.ok(loginOutput);
    } catch (error) {
      console.log('Login User Error:', error);
      return ResponseBuilder.unauthorized(error.message);
    }
  }

  // /**
  //  * Authorize user token.
  //  *
  //  *
  //  * @returns {AuthUser}
  //  * @memberof AuthController
  //  */
  // public authorizer: AuthorizerHandler = async (event: CustomAuthorizerEvent, context: ApiContext, callback: CustomAuthorizerCallback): Promise<void> => {
  //   const authorization = event.authorizationToken || '';
  //   const authPrefix = 'Bearer ';
  //   startMongoose().then(async () => {
  //     try {
  //       let user: AuthUser;
  //       let token: string;
  //       if (authorization.startsWith(authPrefix)) {
  //         token = authorization.substr(authPrefix.length);
  //         user = await this.userAuthorizer.handle(token);
  //         return ResponseBuilder.ok<AuthUser>(user, callback);
  //       } else {
  //         return ResponseBuilder.unauthorized('Unauthorized', callback);
  //       }
  //     } catch (error) {
  //       console.log('Authorizer User Error:', error);
  //       return ResponseBuilder.unauthorized(error.message, callback);
  //     }
  //   });
  // }
}

export default AuthController;
