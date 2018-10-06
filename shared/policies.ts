import { Policy } from '../src/auth/models/auth-model';

const polices: Policy[] = [
  {
    roles: ['global_user'],
    resources: '/users/profile',
    permissions: 'GET'
  },
  {
    roles: ['global_user'],
    resources: '/organizations',
    permissions: 'POST'
  }
];

export default [...polices];
