import { CqrsServiceBase } from '../../../shared/services/ioc-services';
import { Policy } from '../models/auth-model';
import * as Acl from 'acl';
const acl = new Acl(new Acl.memoryBackend());
import policies from '../../../shared/policies';

export class UserValidateRoleHandler implements CqrsServiceBase {
  constructor() {
    policies.forEach((policy: Policy) => {
      console.log('setup policy:', policy);
      this.invokeRolesPolicies(policy);
    });
  }

  async handle(input: Policy): Promise<boolean> {
    console.log('UserValidateRoleHandler.input:', input);
    try {
      // validate role
      const returnValue = await this.isAllowed(input);
      return returnValue;
    } catch (error) {
      console.log('Register User Service Error:', error);
      throw error;
    }
  }

  private invokeRolesPolicies(
    policy: Policy
  ) {
    acl.allow([
      {
        roles: policy.roles,
        allows: [
          {
            resources: policy.resources,
            permissions: policy.permissions
          }
        ]
      }
    ]);
  }

  private isAllowed(data: Policy): Promise<boolean> {
    console.log('isAllowed.input:', data);
    return new Promise<boolean>((resolve, reject) => {
      acl.areAnyRolesAllowed(
        data.roles,
        data.resources,
        data.permissions,
        (err, allow) => {
          if (err) {
            console.log('err:', err);
            return reject(new Error('Unexpected authorization error'));
          } else {
            if (allow) {
              // Access granted! Invoke next middleware
              return resolve(true);
            } else {
              return resolve(false);
            }
          }
        }
      );
    });
  }
}
