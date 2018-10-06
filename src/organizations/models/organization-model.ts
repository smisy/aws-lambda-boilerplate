import { ApiModel } from '../../../shared/models/api-model';

export class OrganizationDataBase extends ApiModel {
  key: string;
  name: string;
  isActive: boolean;
  phone?: string;
  address?: string;
}

export class OrganizationDataModel extends OrganizationDataBase {
  id?: string;
}

export class CreateOrganizationInputModel extends ApiModel {
  name: string;
}

export class CreateOrganizationOutputModel extends ApiModel {
  organization: OrganizationDataModel;
}
