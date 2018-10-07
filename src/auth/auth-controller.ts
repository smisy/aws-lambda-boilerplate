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
  Statement,
  AuthResponseContext
} from 'aws-lambda';
import { UserRegisterHandler } from './services/user-register-handler';
import { UserAuthorizerHandler } from './services/user-authorize-handler';
import { UserValidateRoleHandler } from './services/user-validate-role-handler';
import { utils } from '../../shared/utils';

export class AuthController {
  private userRegister: UserRegisterHandler;
  private userLogin: UserLoginHandler;
  private userAuthorizer: UserAuthorizerHandler;
  private userValidateRole: UserValidateRoleHandler;

  /**
   * @memberof AuthController
   */
  constructor() {
    this.userAuthorizer = new UserAuthorizerHandler();
    this.userLogin = new UserLoginHandler();
    this.userRegister = new UserRegisterHandler();
    this.userValidateRole = new UserValidateRoleHandler();
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
    context: Context
  ): Promise<APIGatewayProxyResult> => {
    const userData: RegisterInputModel = JSON.parse(event.body);
    let userOutput: RegisterOutputModel;
    await startMongoose();
    try {
      userOutput = await this.userRegister.handle(context, userData);
      return ResponseBuilder.ok(userOutput.user);
    } catch (error) {
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
    context: Context
  ): Promise<APIGatewayProxyResult> => {
    const loginData: LoginInputModel = JSON.parse(event.body);
    let loginOutput: LoginOutputModel;
    await startMongoose();
    try {
      loginOutput = await this.userLogin.handle(context, loginData);
      return ResponseBuilder.ok(loginOutput);
    } catch (error) {
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
    context: Context
  ): Promise<CustomAuthorizerResult> => {
    const authorization = event.authorizationToken || '';
    const authPrefix = 'Bearer ';
    await startMongoose();

    try {
      let user: AuthUser;
      let token: string;
      if (authorization.startsWith(authPrefix)) {
        token = authorization.substr(authPrefix.length);
        user = await this.userAuthorizer.handle(context, token);

        const { httpMethod, resourcePath } = utils.extractMethodAndPath(
          event.methodArn
        );

        const isRoleValid = await this.userValidateRole.handle(context, {
          permissions: httpMethod,
          roles: user.globalRoles,
          resources: resourcePath
        });
        if (!isRoleValid) {
          return this.generatePolicy(undefined, 'Deny', event.methodArn);
        }
        console.log('user:', user);
        let authorizedContext: AuthResponseContext = {
          user
        };

        const policy = this.generatePolicy(
          user.id,
          'Allow',
          event.methodArn,
          authorizedContext
        );
        return policy;
      } else {
        return this.generatePolicy(undefined, 'Deny', event.methodArn);
      }
    } catch (error) {
      return this.generatePolicy(undefined, 'Deny', event.methodArn);
    }
  }

  private generatePolicy = (
    principalId: string,
    effect: string,
    resource: string,
    context?: AuthResponseContext
  ): CustomAuthorizerResult => {
    const policyDocument = {} as PolicyDocument;

    if (effect && resource) {
      policyDocument.Version = '2012-10-17';
      policyDocument.Statement = [];
      const statementOne = {
        Action: ['execute-api:Invoke'],
        Resource: resource,
        Effect: effect
      } as Statement;
      policyDocument.Statement.push(statementOne);
    }
    const authResponse: CustomAuthorizerResult = {
      principalId,
      policyDocument,
      context: context
    };
    console.log({ authResponse });
    return authResponse;
  }
}

export default AuthController;
