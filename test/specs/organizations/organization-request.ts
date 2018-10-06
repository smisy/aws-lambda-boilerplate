import { RestRequest, ActionRequestOutput } from '../RestRequest';
import { CreateOrganizationOutputModel } from '../../../src/organizations/models/organization-model';
import { create } from '../../../src/organizations/organization';
import { AuthResponseContext } from 'aws-lambda';

export class OrganizationRestRequest extends RestRequest {
  async callCreateAPI(
    authorizer: AuthResponseContext,
    body: any
  ): Promise<ActionRequestOutput<CreateOrganizationOutputModel>> {
    return await this.CallRestAPI<CreateOrganizationOutputModel>(create, {
      authorizer,
      body
    });
  }
}
