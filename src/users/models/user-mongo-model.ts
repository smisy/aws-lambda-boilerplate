'use strict';

/**
 * Module dependencies
 */
import * as mongoose from 'mongoose';
import * as crypto from 'crypto';
import * as owasp from 'owasp-password-strength-test';
import * as _ from 'lodash';
import { UserDataBase, GLOBAL_ROLES } from './user-model';

owasp.config({
  allowPassphrases: true,
  maxLength: 128,
  minLength: 10,
  minPhraseLength: 20,
  minOptionalTestsToPass: 4
});
export interface UserDataMongoModel extends UserDataBase, mongoose.Document {
  hashPassword: Function;
  authenticate: Function;
  wasNew: boolean;
  isNew: boolean;
}

/**
 * User Schema
 */
let UserSchema = new mongoose.Schema(
  {
    displayName: {
      type: String,
      index: true,
      trim: true
    },
    email: {
      type: String,
      unique: true,
      sparse: true, // For this to work on a previously indexed field, the index must be dropped & the application restarted.
      lowercase: true,
      trim: true,
      default: undefined
    },
    name: {
      type: String,
      default: '',
      trim: true,
      required: [true, 'Please fill in your name']
    },
    password: {
      type: String,
      default: '',
      required: [true, 'Please fill in your password']
    },
    salt: {
      type: String
    },
    profileImageURL: {
      type: String,
      default: 'https://s3.amazonaws.com/nailscloud/images/default.png'
    },
    provider: {
      type: String,
      required: 'Provider is required'
    },
    globalRoles: {
      type: [
        {
          type: String,
          enum: Object.keys(GLOBAL_ROLES)
        }
      ],
      default: [GLOBAL_ROLES.global_user],
      required: 'Please provide at least one role'
    },
    /* For reset password */
    resetPasswordToken: {
      type: String
    },
    resetPasswordExpires: {
      type: Date
    },
    confirmationToken: {
      type: String
    },
    confirmAt: {
      type: Date
    },
    deleted: {
      type: Boolean,
      default: false
    },
    timezone: {
      type: String,
      trim: true
    },
    phone: {
      type: String,
      trim: true,
      unique: true,
      sparse: true, // For this to work on a previously indexed field, the index must be dropped & the application restarted.
      lowercase: true,
      default: undefined
      // validate: [validateUsername, 'Please fill a valid phone number']
    }
  },
  {
    timestamps: true
  }
);

UserSchema.set('toJSON', {
  virtuals: true
});

UserSchema.set('toObject', {
  virtuals: true
});

/**
 * Hook a pre save method to hash the password
 */
UserSchema.pre<UserDataMongoModel>('save', function(next) {
  if (this.password && this.isModified('password')) {
    this.salt = crypto.randomBytes(16).toString('base64');
    this.password = this.hashPassword(this.password);
  }

  this.wasNew = this.isNew;
  if (this.isNew) {
    this.confirmationToken = `${crypto
      .randomBytes(16)
      .toString('hex')}${this._id.valueOf()}`;
  }
  next();
});

/**
 * Hook a pre validate method to test the local password
 */
UserSchema.pre<UserDataMongoModel>('validate', function(next) {
  if (
    this.provider === 'local' &&
    this.password &&
    this.isModified('password')
  ) {
    let result = owasp.test(this.password);
    if (result.errors.length) {
      let error = result.errors.join(' ');
      this.invalidate('password', error, this.password);
    }
  }

  let username = this.email || this.phone;
  if (!username || username.length === 0) {
    this.invalidate(
      'username',
      'Please fill a valid email address or phone number',
      `${this.email} ${this.phone}`
    );
  }
  next();
});

/**
 * Create instance method for hashing a password
 */
UserSchema.methods.hashPassword = function(password: string) {
  if (this.salt && password) {
    return crypto
      .pbkdf2Sync(password, new Buffer(this.salt, 'base64'), 10000, 64, 'SHA1')
      .toString('base64');
  } else {
    return password;
  }
};

/**
 * Create instance method for authenticating user
 */
UserSchema.methods.authenticate = function(password: string) {
  return this.password === this.hashPassword(password);
};

// @ts-ignore
global.UserSchema =
  // @ts-ignore
  global.UserSchema || mongoose.model<UserDataMongoModel>('User', UserSchema);

// @ts-ignore
export default global.UserSchema;
