import { Inject } from 'typescript-ioc';
import * as mongoose from 'mongoose';

// import { UserRegisterHandler } from './services/user-register-handler';
import {
  LoginInputModel,
  LoginOutputModel,
  RegisterInputModel,
  RegisterOutputModel,
  AuthUser
} from './models/auth-model';
import { ResponseBuilder } from '../../shared/response-builder';
import { startMongoose } from '../../shared/mongoose/mongoose';
import { UserLoginHandler } from './services/user-login-handler';
import {
  APIGatewayProxyHandler,
  APIGatewayProxyEvent,
  Context,
  APIGatewayProxyResult,
  CustomAuthorizerHandler,
  CustomAuthorizerEvent,
  CustomAuthorizerResult,
  PolicyDocument,
  Statement
} from 'aws-lambda';
import { UserRegisterHandler } from './services/user-register-handler';
import { UserAuthorizerHandler } from './services/user-authorize-handler';

export class AuthController {
  static connection: mongoose.Mongoose;
  @Inject private userRegister: UserRegisterHandler;
  @Inject private userLogin: UserLoginHandler;
  @Inject private userAuthorizer: UserAuthorizerHandler;

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

  /**
   * Authorize user token.
   *
   *
   * @returns {AuthUser}
   * @memberof AuthController
   */
  public authorize: CustomAuthorizerHandler = async (
    event: CustomAuthorizerEvent,
    context: Context): Promise<CustomAuthorizerResult> => {
    const authorization = event.authorizationToken || '';
    const authPrefix = 'Bearer ';
    await startMongoose();

    try {
      let user: AuthUser;
      let token: string;
      if (authorization.startsWith(authPrefix)) {
        token = authorization.substr(authPrefix.length);
        user = await this.userAuthorizer.handle(token);
        const policy = this.generatePolicy(user.id, 'Allow', event.methodArn);
        console.log('policy:', policy);
        return policy;
      } else {
        return this.generatePolicy(undefined, 'Deny', event.methodArn);
      }
    } catch (error) {
      console.log('Authorizer User Error:', error);
      return this.generatePolicy(undefined, 'Deny', event.methodArn);
    }
  }

  private generatePolicy = (principalId: string, effect: string, resource: string): CustomAuthorizerResult => {
    const policyDocument = {} as PolicyDocument;

    if (effect && resource) {
      policyDocument.Version = '2012-10-17';
      policyDocument.Statement = [];
      const statementOne = {
        Action: [
          'execute-api:Invoke'
        ],
        Resource: resource,
        Effect: effect
      } as Statement;
      policyDocument.Statement.push(statementOne);
    }
    const authResponse: CustomAuthorizerResult = {
      principalId,
      policyDocument
    };

    return authResponse;
  }
}

export default AuthController;
