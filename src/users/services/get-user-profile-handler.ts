import { CqrsServiceBase } from '../../../shared/services/ioc-services';
import UserModel from '../../users/models/user-mongo-model';
import { GetUserProfileInput, GetUserProfileOutput, UserProfileDataModel } from '../models/user-model';

export class GetUserProfileHandler implements CqrsServiceBase {

  async handle(
    input: GetUserProfileInput
  ): Promise<GetUserProfileOutput> {
    try {
      const user = await UserModel.findById(input.id).exec();
      if (!user || user.deleted) {
        throw new Error(`Invalid User Id (${(new Date()).toLocaleTimeString()})`);
      }

      // remove sensitive data
      let { password, salt, confirmationToken, ...rest} = user.toJSON();
      let returnValue: GetUserProfileOutput = {
        user: new UserProfileDataModel(rest)
      };

      return returnValue;
    } catch (error) {
      throw error;
    }
  }
}
