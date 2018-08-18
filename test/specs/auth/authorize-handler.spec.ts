import { RegisterInputModel, LoginInputModel } from '../../../src/auth/models/auth-model';
import { AuthRestRequest } from './auth-request';
import { startMockgoose, resetMongoose } from '../../lib/mongoose';
import 'mocha';
import 'should';

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

  it('should return principalId as user Id for authorize request with valid token', async () => {
    let response = await authRequest.callAuthorizeAPI(token);
    response.should.have.property('principalId');
  });

  it('should return principalId as user Id for authorize request with invalid token', async () => {
    let response = await authRequest.callAuthorizeAPI('Bearer 12345678');
    response.should.have.property('principalId').and.equal(undefined);
  });

  it('should return principalId as user Id for authorize request with empty token', async () => {
    let response = await authRequest.callAuthorizeAPI();
    response.should.have.property('principalId').and.equal(undefined);
  });
});
