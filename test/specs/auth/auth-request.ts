import { RestRequest, ActionRequestOutput } from '../RestRequest';
import { login, register, authorize } from '../../../src/auth/auth';
import { UserDataModel } from '../../../src/users/models/user-model';
import { LoginOutputModel } from '../../../src/auth/models/auth-model';
import { CustomAuthorizerResult, CustomAuthorizerEvent, Context } from 'aws-lambda';

export  class AuthRestRequest extends RestRequest {

  async callRegisterAPI(body: Object): Promise<ActionRequestOutput<UserDataModel>> {
    return await this.CallRestAPI<UserDataModel>(register, { body });
  }

  async callLoginAPI(body: Object): Promise<ActionRequestOutput<LoginOutputModel>> {
    return await this.CallRestAPI<LoginOutputModel>(login, { body });
  }

  async callAuthorizeAPI(token: string): Promise<CustomAuthorizerResult> {
    const event: CustomAuthorizerEvent = {} as CustomAuthorizerEvent;
    let context: Context;
    event.authorizationToken = token;
    let response = await authorize(event, context, undefined) as CustomAuthorizerResult;
    return response;
  }
}
