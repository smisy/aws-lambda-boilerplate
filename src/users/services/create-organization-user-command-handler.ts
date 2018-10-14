import OrganizationUserModel from '../models/organization-user-mongo-model';
import { CqrsServiceBase } from '../../../shared/services/ioc-services';
import {
  CreateOrganizationUserInputModel,
  CreateOrganizationUserOutputModel,
  ORGANIZATION_ROLES
} from '../models/organization-user-model';
import { APIGatewayEventRequestContext } from 'aws-lambda';

export class CreateOrganizationUserCommandHandler
  implements CqrsServiceBase {
  async handle(
    context: APIGatewayEventRequestContext,
    input: CreateOrganizationUserInputModel
  ): Promise<CreateOrganizationUserOutputModel> {
    try {
      // set admin role
      let organizationUser = new OrganizationUserModel({
        ...input,
        roles: [ORGANIZATION_ROLES.organization_admin]
      });
      let newOrganizationUser = await organizationUser.save();

      let returnValue: CreateOrganizationUserOutputModel = {
        organizationUser: newOrganizationUser.toJSON()
      };
      return returnValue;
    } catch (error) {
      throw error;
    }
  }
}
