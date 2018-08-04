import { CqrsServiceBase } from '../../../shared/services/ioc-services';
import UserModel from '../../users/models/user-mongo-model';
import { LoginInputModel, LoginOutputModel, AuthUser } from '../models/auth-model';
import { JWTAuthenticator } from '../../../shared/jwt/JWTAuthenticator';

export class UserLoginHandler implements CqrsServiceBase {

  async handle(
    input: LoginInputModel
  ): Promise<LoginOutputModel> {
    try {
      const user = await UserModel.findOne({
        $or: [{
          phone: input.userName.toLowerCase()
        }, {
          email: input.userName.toLowerCase()
        }]
      }).exec();
      if (!user || !user.authenticate(input.password)) {
        throw new Error(`Invalid username or password (${(new Date()).toLocaleTimeString()})`);
      }

      if (user.deleted) {
        throw new Error();
      }

      const jwtAuth = new JWTAuthenticator();
      let auth: AuthUser = {
        id: user.id
      };

      const token = await jwtAuth.authenticate(auth);
      let returnValue: LoginOutputModel = {
        token: token
      };

      return returnValue;
    } catch (error) {
      throw error;
    }
  }
}
