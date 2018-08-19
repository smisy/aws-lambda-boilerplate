import * as mongoose from 'mongoose';
import { OrganizationUserRoleDataBase, ORGANIZATION_ROLES } from './organization-user-role-model';

export interface OrganizationUserRoleDataMongoModel extends OrganizationUserRoleDataBase, mongoose.Document {
}
/**
 * OrganizationUserRole Schema
 */
let OrganizationUserRoleSchema = new mongoose.Schema(
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
    roles: {
      type: [
        {
          type: String,
          enum: Object.keys(ORGANIZATION_ROLES)
        }
      ],
      default: [ORGANIZATION_ROLES.user],
      required: 'Please provide at least one role'
    },
  },
  {
    timestamps: true
  }
);

OrganizationUserRoleSchema.set('toJSON', {
  virtuals: true
});

OrganizationUserRoleSchema.set('toObject', {
  virtuals: true
});

// @ts-ignore
global.OrganizationUserRoleSchema =
  // @ts-ignore
  global.OrganizationUserRoleSchema || mongoose.model<OrganizationUserRoleDataMongoModel>('OrganizationUserRole', OrganizationUserRoleSchema);

// @ts-ignore
export default global.OrganizationUserRoleSchema;
