import { RegisterInputModel, LoginInputModel } from '../../../src/auth/models/auth-model';
import { AuthRestRequest } from './auth-request';
import { startMockgoose, resetMongoose } from '../../lib/mongoose';

const newUser: RegisterInputModel = {
  name: 'Test',
  email: 'login@test.com',
  password: 'Test@test123',
  phone: '+14049756123'
};

const loginData: LoginInputModel = {
  userName: newUser.email,
  password: newUser.password
};

let authRequest: AuthRestRequest;
let token: string;
describe('Login and generate token', () => {
  before(async () => {
    authRequest = new AuthRestRequest();
    await startMockgoose();
    await authRequest.callRegisterAPI(newUser);
    let response = await authRequest.callLoginAPI(loginData);
    token = `Bearer ${response.body.token}`;
  });

  afterEach(async () => {
    await resetMongoose();
  });

  it('should return 200 and token for authorize request with valid token', async () => {

    let response = await authRequest.callAuthorizeAPI(token);
    console.log('authorize:', response);
  });

});
