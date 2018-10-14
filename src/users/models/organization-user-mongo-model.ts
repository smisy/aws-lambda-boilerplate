import * as mongoose from 'mongoose';
import {
  OrganizationUserDataBase,
  ORGANIZATION_ROLES
} from './organization-user-model';

export interface OrganizationUserDataMongoModel
  extends OrganizationUserDataBase,
    mongoose.Document {}
/**
 * OrganizationUser Schema
 */
let OrganizationUserSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    organization: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Organization',
      required: true
    },
    organizationRoles: {
      type: [
        {
          type: String,
          enum: Object.keys(ORGANIZATION_ROLES)
        }
      ],
      default: [ORGANIZATION_ROLES.organization_user],
      required: 'Please provide at least one role'
    }
  },
  {
    timestamps: true
  }
);

OrganizationUserSchema.set('toJSON', {
  virtuals: true
});

OrganizationUserSchema.set('toObject', {
  virtuals: true
});

// @ts-ignore
global.OrganizationUserSchema =
  // @ts-ignore
  global.OrganizationUserSchema ||
  mongoose.model<OrganizationUserDataMongoModel>(
    'OrganizationUser',
    OrganizationUserSchema
  );

// @ts-ignore
export default global.OrganizationUserSchema;
