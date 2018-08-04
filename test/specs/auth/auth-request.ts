import { RestRequest, ActionRequestOutput } from '../RestRequest';
import { register } from '../../../src/auth/auth';

export  class AuthRestRequest extends RestRequest {
  async callRegisterAPI(body: Object): Promise<ActionRequestOutput> {
    return await this.CallRestAPI(register, { body });
  }
}
