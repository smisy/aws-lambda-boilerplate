import { RestRequest, ActionRequestOutput } from '../RestRequest';
import { UserProfileDataModel } from '../../../src/users/models/user-model';
import { getProfile } from '../../../src/users/user';
import { AuthResponseContext } from 'aws-lambda';

export  class UserProfileRestRequest extends RestRequest {

  async callGetProfileAPI(authorizer: AuthResponseContext): Promise<ActionRequestOutput<UserProfileDataModel>> {
    return await this.CallRestAPI<UserProfileDataModel>(getProfile, { authorizer });
  }
}
