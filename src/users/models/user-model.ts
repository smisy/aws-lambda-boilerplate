import ApiModel from '../../../shared/models/api-model';

export enum USER_TYPES {
    user = 'user',
    admin = 'admin',
    owner = 'owner',
    technician = 'technician',
    customer = 'customer'
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
    roles: USER_TYPES[];
    updated: Date;
    created: Date;
    /* For reset password */
    resetPasswordToken: string;
    resetPasswordExpires: Date;
    confirmationToken: string;
    confirmAt: Date;
    type: USER_TYPES;
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
}

export class GetUserProfileOutput extends ApiModel {
    user: UserProfileDataModel;
}
