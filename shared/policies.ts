import { Policy } from '../src/auth/models/auth-model';

const polices: Policy[] = [
  {
    roles: ['user'],
    resources: '/users/profile',
    permissions: 'GET'
  }
];

export default [...polices];
