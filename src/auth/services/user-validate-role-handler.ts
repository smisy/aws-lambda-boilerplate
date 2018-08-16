import { CqrsServiceBase } from '../../../shared/services/ioc-services';
import { Policy } from '../models/auth-model';
import * as Acl from 'acl';
import * as fs from 'fs';
import * as path from 'path';
const acl = new Acl(new Acl.memoryBackend());

export class UserValidateRoleHandler implements CqrsServiceBase {
  constructor() {
    const policyFile = fs.readFileSync(
      path.join(__dirname, '../../../shared/policies.json'),
      'utf8'
    );
    const policies = JSON.parse(policyFile);
    console.log('policies:', policies);
    const invokeRolesPolicies = this.invokeRolesPolicies.bind(this);
    policies.forEach((policy: Policy) => {
      invokeRolesPolicies(policy);
    });
  }

  async handle(input: Policy): Promise<boolean> {
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
    roles: string[],
    resources: string,
    permissions: string
  ) {
    acl.allow([
      {
        roles: roles,
        allows: [
          {
            resources: resources,
            permissions: permissions
          }
        ]
      }
    ]);
  }

  private isAllowed(data: Policy): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      acl.areAnyRolesAllowed(
        data.roles,
        data.resources,
        data.permissions,
        (err, allow) => {
          if (err) {
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
