import { ApiModel } from '../../../shared/models/api-model';
import { UserDataModel } from '../../users/models/user-model';
import { OrganizationDataModel } from './organization-model';

export enum ORGANIZATION_ROLES {
  organization_user = 'organization_user',
  organization_admin = 'organization_admin'
}

export class OrganizationUserDataBase extends ApiModel {
  user: string | UserDataModel;
  organization: string | OrganizationDataModel;
  organizationRoles: ORGANIZATION_ROLES[];
}

export class OrganizationUserDataModel extends OrganizationUserDataBase {
  id?: string;
}

export class CreateOrganizationUserInputModel extends ApiModel {
  user: string;
  organization: string;
}

export class CreateOrganizationUserOutputModel extends ApiModel {
  organizationUser: OrganizationUserDataBase;
}
