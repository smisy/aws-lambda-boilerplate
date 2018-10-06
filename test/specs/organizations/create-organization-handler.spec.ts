import { AuthRestRequest } from '../auth/auth-request';
import { startMockgoose, resetMongoose } from '../../lib/mongoose';
import { AuthResponseContext } from 'aws-lambda';
import { UserDataModel } from '../../../src/users/models/user-model';
import { RegisterInputModel } from '../../../src/auth/models/auth-model';
import { ActionRequestOutput } from '../RestRequest';
import { OrganizationRestRequest } from './organization-request';
import { CreateOrganizationInputModel } from '../../../src/organizations/models/organization-model';

const newUser: RegisterInputModel = {
  name: 'Test',
  email: 'login@test.com',
  password: 'Test@test123',
  phone: '+14049756123'
};

const newOrganization: CreateOrganizationInputModel = new CreateOrganizationInputModel(
  {
    name: 'New Organization'
  }
);

let authRequest: AuthRestRequest;
let registerResponse: ActionRequestOutput<UserDataModel>;
let user: UserDataModel;
let organizationRestRequest: OrganizationRestRequest;
describe('Create Organization', () => {
  before(async () => {
    authRequest = new AuthRestRequest();
    organizationRestRequest = new OrganizationRestRequest();
    await startMockgoose();
    registerResponse = await authRequest.callRegisterAPI(newUser);
    user = registerResponse.body;
  });

  afterEach(async () => {
    await resetMongoose();
  });

  it('should return 200 create new organization with right authorizer', async () => {
    let authorizer: AuthResponseContext = {
      principalId: user.id
    };
    let { response, body } = await organizationRestRequest.callCreateAPI(
      authorizer,
      newOrganization
    );
    response.statusCode.should.be.equal(200);
    body.should.have.property('organization');
    body.should.have.property('organizationUserRole');
    const organization = body.organization;
    organization.should.have.property('id');
    const organizationUserRole = body.organizationUserRole;
    organizationUserRole.should.have.property('id');
  });

  it('should return 422 create new organization with missing name', async () => {
    let { name, ...rest } = newOrganization;
    let authorizer: AuthResponseContext = {
      principalId: user.id
    };
    let { response } = await organizationRestRequest.callCreateAPI(
      authorizer,
      rest
    );
    response.statusCode.should.be.equal(422);
  });
});
