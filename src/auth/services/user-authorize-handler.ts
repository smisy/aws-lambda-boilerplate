import { JWTAuthenticator } from '../../../shared/jwt/JWTAuthenticator';
import { AuthUser } from '../models/auth-model';
import { CqrsServiceBase } from '../../../shared/services/ioc-services';

export class UserAuthorizerHandler implements CqrsServiceBase {
  async handle(input: string): Promise<AuthUser> {
    try {
      const jwtAuth = new JWTAuthenticator();
      const authUser = await jwtAuth.validate(input);
      let returnValue = authUser;
      return returnValue;
    } catch (error) {
      throw error;
    }
  }
}
