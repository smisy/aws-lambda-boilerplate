import { CqrsServiceBase } from '../../../shared/services/ioc-services';
import { Policy } from '../models/auth-model';
import * as Acl from 'acl';
const acl = new Acl(new Acl.memoryBackend());
import policies from '../../../shared/policies';
import { APIGatewayEventRequestContext } from 'aws-lambda';

export class UserValidateRoleHandler implements CqrsServiceBase {
  constructor() {
    policies.forEach((policy: Policy) => {
      this.invokeRolesPolicies(policy);
    });
  }

  async handle(context: APIGatewayEventRequestContext, input: Policy): Promise<boolean> {
    try {
      // validate role
      const returnValue = await this.isAllowed(input);
      return returnValue;
    } catch (error) {
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

  private async isAllowed(data: Policy): Promise<boolean> {
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
