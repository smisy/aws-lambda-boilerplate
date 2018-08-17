import ApiModel from '../../../shared/models/api-model';
import { UserDataModel, USER_TYPES } from '../../users/models/user-model';

class LoginInputModel extends ApiModel {
  public userName: string;
  public password: string;
}

class LoginOutputModel extends ApiModel {
  public token: string;
}

class RegisterInputModel extends ApiModel {
  public name: string;
  public email?: string;
  public password: string;
  public phone?: string;
}

class RegisterOutputModel extends ApiModel {
  user: UserDataModel;
}

export class AuthUser extends ApiModel {
  id: string;
  roles: USER_TYPES[];
}

export class Policy extends ApiModel {
  roles: string[];
  resources: string;
  permissions: string;
}

export { LoginInputModel, LoginOutputModel, RegisterInputModel, RegisterOutputModel };
