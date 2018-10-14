import { ApiModel } from '../../../shared/models/api-model';
import { UserDataModel, UserProfileDataModel } from './user-model';
import { OrganizationDataModel } from '../../organizations/models/organization-model';

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

export class AddOrganizationToUserProfileInputModel extends ApiModel {
  organizationId: string;
}

export class AddOrganizationToUserProfileOutputModel extends ApiModel {
  user: UserProfileDataModel;
}
