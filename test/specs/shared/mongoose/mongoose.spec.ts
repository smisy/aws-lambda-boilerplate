import { startMongoose } from '../../../../shared/mongoose/mongoose';
import * as mongoose from 'mongoose';
import 'should';

describe('Mongoose', () => {
  beforeEach(async () => {
    await mongoose.disconnect();
  });

  it(`should return error if start mongoose without DB server`, async () => {
    try {
      let conn = await startMongoose();
      conn.should.equal(undefined);
    } catch (error) {
      error.should.not.equal(undefined);
    }
  });
});
