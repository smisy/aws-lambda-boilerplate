import ApiModel from '../../../shared/models/api-model';

export enum GLOBAL_ROLES {
    global_user = 'global_user',
    global_admin = 'global_admin',
}

export class UserDataBase extends ApiModel {
    displayName: string;
    email: string;
    name: string;
    password: string;
    salt: string;
    profileImageURL: string;
    provider: string;
    providerData: object;
    additionalProvidersData: object;
    globalRoles: GLOBAL_ROLES[];
    updated: Date;
    created: Date;
    /* For reset password */
    resetPasswordToken: string;
    resetPasswordExpires: Date;
    confirmationToken: string;
    confirmAt: Date;
    deleted: boolean;
    skypeId: string;
    timezone: string;
    phone: string;
}

export class UserDataModel extends UserDataBase {
    id?: string;
}

export class UserProfileDataModel extends ApiModel {
    id: string;
    phone: string;
    email: string;
    displayName: string;
    profileImageURL: string;
    timezone: string;
}

export class GetUserProfileInput extends ApiModel {
  id: string;
}
export class GetUserProfileOutput extends ApiModel {
    user: UserProfileDataModel;
}
