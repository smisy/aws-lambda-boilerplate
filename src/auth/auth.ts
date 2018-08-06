import AuthController from './auth-controller';
import { APIGatewayProxyHandler, CustomAuthorizerHandler } from 'aws-lambda';

const authController: AuthController = new AuthController();
export const register: APIGatewayProxyHandler = authController.registerUser;
export const login: APIGatewayProxyHandler = authController.loginUser;
export const authorize: CustomAuthorizerHandler = authController.authorize;
