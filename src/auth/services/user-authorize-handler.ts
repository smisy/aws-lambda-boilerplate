import { JWTAuthenticator } from '../../../shared/jwt/JWTAuthenticator';
import { AuthUser } from '../models/auth-model';
import { CqrsServiceBase } from '../../../shared/services/ioc-services';
import { APIGatewayEventRequestContext } from 'aws-lambda';

export class UserAuthorizerHandler implements CqrsServiceBase {
  async handle(context: APIGatewayEventRequestContext, input: string): Promise<AuthUser> {
    try {
      const jwtAuth = new JWTAuthenticator();
      const authUser = await jwtAuth.validate(input);
      console.log({authUser});
      let returnValue = authUser;
      return returnValue;
    } catch (error) {
      throw error;
    }
  }
}
