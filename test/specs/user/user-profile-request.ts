import { RestRequest, ActionRequestOutput } from '../RestRequest';
import { UserProfileDataModel } from '../../../src/users/models/user-model';
import { getProfile } from '../../../src/users/user';

export  class UserProfileRestRequest extends RestRequest {

  async callHetProfileAPI(parameter: any): Promise<ActionRequestOutput<UserProfileDataModel>> {
    return await this.CallRestAPI<UserProfileDataModel>(getProfile, { parameter });
  }
}
