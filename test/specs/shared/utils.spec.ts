import { utils } from '../../../shared/utils';

import 'should';

const methodArn = 'arn:aws:execute-api:us-east-1:random-account-id:random-api-id/local/GET/users/profile';

describe('Utils', () => {

  it(`should return path and method with valid data`, async () => {
    const { httpMethod, resourcePath } = utils.extractMethodAndPath(
      methodArn
    );
    httpMethod.should.equal('GET');
    resourcePath.should.equal('/users/profile');
  });
});
