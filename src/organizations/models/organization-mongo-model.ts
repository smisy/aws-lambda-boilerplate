import * as mongoose from 'mongoose';
import { OrganizationDataBase } from './organization-model';

export interface OrganizationDataMongoModel
  extends OrganizationDataBase,
    mongoose.Document {}
/**
 * Organization Schema
 */
let OrganizationSchema = new mongoose.Schema(
  {
    key: {
      type: String,
      trim: true,
      default: '',
      required: [true, 'Key is required'],
      dropDups: true,
      unique: true
    },
    name: {
      type: String,
      trim: true,
      required: true
    },
    isActive: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true
  }
);

OrganizationSchema.set('toJSON', {
  virtuals: true
});

OrganizationSchema.set('toObject', {
  virtuals: true
});

const generateRandomKey = (baseString: string) => {
  let key;
  if (baseString) {
    key = baseString.replace(/\s+/g, '-').toLowerCase();
  }
  key = `${key}-${Math.floor(1000 + Math.random() * 9000)}`;
  return key;
};

/**
 * Hook a pre validate method to generate organization key
 */
OrganizationSchema.pre<OrganizationDataMongoModel>('validate', function(next) {
  this.key = generateRandomKey(this.name);
  next();
});

// @ts-ignore
global.OrganizationSchema =
  // @ts-ignore
  global.OrganizationSchema ||
  mongoose.model<OrganizationDataMongoModel>(
    'Organization',
    OrganizationSchema
  );

// @ts-ignore
export default global.OrganizationSchema;
