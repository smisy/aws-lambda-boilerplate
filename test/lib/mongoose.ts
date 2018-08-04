import * as mongoose from 'mongoose';
import * as mockgoose from 'mockgoose';
const Mockgoose = mockgoose.Mockgoose;
const mockgooseTest = new Mockgoose(mongoose);

export const startMockgoose = async (): Promise<void> => {
  await mockgooseTest.prepareStorage();
};

export const resetMongoose = async (): Promise<void> => {
  return new Promise<void>((resolve, reject) => {
    mockgooseTest.helper.reset().then((err) => {
      if (err) {
        return reject(err);
      }
      return resolve();
    });
  });
};
