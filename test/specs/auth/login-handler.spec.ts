import { startMockgoose, resetMongoose } from '../../lib/mongoose';
import 'mocha';
import 'should';
import { RegisterInputModel, LoginInputModel } from '../../../src/auth/models/auth-model';
import { AuthRestRequest } from './auth-request';

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

const invalidLoginData: LoginInputModel = {
  userName: '123',
  password: newUser.password
};

let authRequest: AuthRestRequest;

describe('Login and generate token', () => {
  before(async () => {
    authRequest = new AuthRestRequest();
    await startMockgoose();
    await authRequest.callRegisterAPI(newUser);
  });

  afterEach(async () => {
    await resetMongoose();
  });

  it('should return 200 and token for login request with valid username & password', async () => {
    let response = await authRequest.callLoginAPI(loginData);
    response.statusCode.should.be.equal(200);
    response.body.should.have.property('token');
  });

  it('should return 401 for login request with invalid username & password', async () => {
    let response = await authRequest.callLoginAPI(invalidLoginData);
    response.statusCode.should.be.equal(401);
  });

  it('should return 401 for login request with missing username', async () => {
    let response = await authRequest.callLoginAPI({ password: loginData.password });
    response.statusCode.should.be.equal(401);
  });

  it('should return 401 for login request with missing password', async () => {
    let response = await authRequest.callLoginAPI({ userName: loginData.userName });
    response.statusCode.should.be.equal(401);
  });

  it('should return 401 for login request with missing username & password', async () => {
    let response = await authRequest.callLoginAPI({});
    response.statusCode.should.be.equal(401);
  });
});
