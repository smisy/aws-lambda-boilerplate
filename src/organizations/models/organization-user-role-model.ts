import { ApiModel } from '../../../shared/models/api-model';
import { UserDataModel } from '../../users/models/user-model';
import { OrganizationDataModel } from './organization-model';

export enum ORGANIZATION_ROLES {
  user = 'user',
  admin = 'admin'
}

export class OrganizationUserRoleDataBase extends ApiModel {
  user: string | UserDataModel;
  organization: string | OrganizationDataModel;
  roles: string[];
}

export class OrganizationUserRoleDataModel extends OrganizationUserRoleDataBase {
  id?: string;
}

export class CreateOrganizationUserRoleInputModel extends ApiModel {
  user: string;
  organization: string;
}

export class CreateOrganizationUserRoleOutputModel extends ApiModel {
  organizationUserRole: OrganizationUserRoleDataBase;
}
