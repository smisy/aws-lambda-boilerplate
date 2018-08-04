import { RestRequest } from '../RestRequest';
import { login, register } from '../../../src/auth/auth';
import { APIGatewayProxyResult } from 'aws-lambda';

export  class AuthRestRequest extends RestRequest {

  async callRegisterAPI(body: Object): Promise<APIGatewayProxyResult> {
    return await this.CallRestAPI(register, { body });
  }

  async callLoginAPI(body: Object): Promise<APIGatewayProxyResult> {
    return await this.CallRestAPI(login, { body });
  }
}
