import { startMockgoose, resetMongoose } from '../../lib/mongoose';
import 'mocha';
import 'should';
import { RegisterInputModel } from '../../../src/auth/models/auth-model';
import { AuthRestRequest } from './auth-request';

const newUser: RegisterInputModel = {
  name: 'Test',
  email: 'test@test.com',
  password: 'Test@test123',
  phone: '+14049856389'
};

let authRequest: AuthRestRequest;

describe('Register New User', () => {
  before(async () => {
    authRequest = new AuthRestRequest();
    await startMockgoose();
  });

  afterEach(async () => {
    await resetMongoose();
  });

  it('should return 200 register request with phone and email', async () => {
    let response = await authRequest.callRegisterAPI(newUser);
    response.statusCode.should.be.equal(200);
    response.body.should.have.property('id');
  });

  it('should return 200 register request with email only', async () => {
    let {phone, ...requestBody} = newUser;

    let response = await authRequest.callRegisterAPI(requestBody);
    response.statusCode.should.be.equal(200);
    response.body.should.have.property('id');
  });

  it('should return 200 register request with phone only', async () => {
    let {email, ...requestBody} = newUser;

    let response = await authRequest.callRegisterAPI(requestBody);
    response.statusCode.should.be.equal(200);
    response.body.should.have.property('id');
  });

  it('should return 422 register request with missing name', async () => {
    let {name, ...requestBody} = newUser;
    let response = await authRequest.callRegisterAPI(requestBody);
    response.statusCode.should.be.equal(422);
    response.body.should.have.property('error');
  });

  it('should return 422 register request with missing password', async () => {
    let {password, ...requestBody} = newUser;
    let response = await authRequest.callRegisterAPI(requestBody);
    response.statusCode.should.be.equal(422);
    response.body.should.have.property('error');
  });

  it('should return 422 register request with missing email and phone', async () => {
    let {email, phone, ...requestBody} = newUser;
    let response = await authRequest.callRegisterAPI(requestBody);
    response.statusCode.should.be.equal(422);
    response.body.should.have.property('error');
  });

});
