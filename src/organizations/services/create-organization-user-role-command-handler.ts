import OrganizationUserModel from '../models/organization-user-role-mongo-model';
import { CqrsServiceBase } from '../../../shared/services/ioc-services';
import {
  CreateOrganizationUserInputModel,
  CreateOrganizationUserOutputModel,
  ORGANIZATION_ROLES
} from '../models/organization-user-role-model';
import { Context } from 'aws-lambda';

export class CreateOrganizationUserCommandHandlerHandler
  implements CqrsServiceBase {
  async handle(
    context: Context,
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
