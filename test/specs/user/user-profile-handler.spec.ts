import { AuthRestRequest } from '../auth/auth-request';
import { startMockgoose, resetMongoose } from '../../lib/mongoose';
import { AuthResponseContext } from 'aws-lambda';
import { UserDataModel } from '../../../src/users/models/user-model';
import { RegisterInputModel } from '../../../src/auth/models/auth-model';
import { ActionRequestOutput } from '../RestRequest';
import { UserProfileRestRequest } from './user-profile-request';

const newUser: RegisterInputModel = {
  name: 'Test',
  email: 'login@test.com',
  password: 'Test@test123',
  phone: '+14049756123'
};

let authRequest: AuthRestRequest;
let registerResponse: ActionRequestOutput<UserDataModel>;
let user: UserDataModel;
let userProfileRequest: UserProfileRestRequest;
describe('Get User Profile', () => {
  before(async () => {
    authRequest = new AuthRestRequest();
    userProfileRequest = new UserProfileRestRequest();
    await startMockgoose();
    registerResponse = await authRequest.callRegisterAPI(newUser);
    user = registerResponse.body;
  });

  afterEach(async () => {
    await resetMongoose();
  });

  it('should return 200 get profile request with right authorizer', async () => {
    let authorizer: AuthResponseContext = {
      user
    };
    let { response, body } = await userProfileRequest.callGetProfileAPI(
      authorizer
    );
    response.statusCode.should.be.equal(200);
    body.should.have.property('id');
  });

  it('should return 422 get profile request with invalid user Id', async () => {
    user.id = '12345678';
    let authorizer: AuthResponseContext = {
      user
    };
    let { response, body } = await userProfileRequest.callGetProfileAPI(
      authorizer
    );
    response.statusCode.should.be.equal(422);
    body.should.have.property('error');
  });

  it('should return 422 get profile request with empty user Id', async () => {
    user.id = undefined;
    let authorizer: AuthResponseContext = {
      user
    };
    let { response, body } = await userProfileRequest.callGetProfileAPI(
      authorizer
    );
    response.statusCode.should.be.equal(422);
    body.should.have.property('error');
  });
});
