import OrganizationUserRoleModel from '../models/organization-user-role-mongo-model';
import { CqrsServiceBase } from '../../../shared/services/ioc-services';
import {
  CreateOrganizationUserRoleInputModel,
  CreateOrganizationUserRoleOutputModel,
  ORGANIZATION_ROLES
} from '../models/organization-user-role-model';

export class CreateOrganizationUserRoleCommandHandlerHandler
  implements CqrsServiceBase {
  async handle(
    input: CreateOrganizationUserRoleInputModel
  ): Promise<CreateOrganizationUserRoleOutputModel> {
    try {
      // set admin role
      let organizationUserRole = new OrganizationUserRoleModel({
        ...input,
        roles: [ORGANIZATION_ROLES.organization_admin]
      });
      let newOrganizationUserRole = await organizationUserRole.save();

      let returnValue: CreateOrganizationUserRoleOutputModel = {
        organizationUserRole: newOrganizationUserRole.toJSON()
      };
      return returnValue;
    } catch (error) {
      throw error;
    }
  }
}
