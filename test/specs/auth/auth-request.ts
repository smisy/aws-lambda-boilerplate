import { RestRequest, ActionRequestOutput } from '../RestRequest';
import { login, register } from '../../../src/auth/auth';
import { UserDataModel } from '../../../src/users/models/user-model';
import { LoginOutputModel } from '../../../src/auth/models/auth-model';

export  class AuthRestRequest extends RestRequest {

  async callRegisterAPI(body: Object): Promise<ActionRequestOutput<UserDataModel>> {
    return await this.CallRestAPI<UserDataModel>(register, { body });
  }

  async callLoginAPI(body: Object): Promise<ActionRequestOutput<LoginOutputModel>> {
    return await this.CallRestAPI<LoginOutputModel>(login, { body });
  }
}
