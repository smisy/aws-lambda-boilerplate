
import * as mongoose from 'mongoose';
// tslint:disable-next-line:promise-function-async
export const startMongoose = (): Promise<mongoose.Mongoose> => {
  // Mongoose uses global Promise by default
  const options = {
    connectTimeoutMS: 3000,
    socketTimeoutMS: 3000,
    poolSize: 15, // Maintain up to 10 socket connections
    // If not connected, return errors immediately rather than waiting for reconnect
    bufferMaxEntries: 0,
    bufferCommands: false,
    useNewUrlParser: true
  };
  const mongoURL: string = process.env.MONGODB_URI ||  `mongodb://localhost:27017/aws-lambda`;
  return new Promise((resolve, reject) => {
    mongoose.set('bufferCommands', false);
    mongoose.connect(
      mongoURL,
      options, (err) => {
        if (err) {
          console.log('Connect MongoDB Error:', err);
          return reject(err);
        }
        console.log('Connected MongoDB');
        return resolve();
      }
    );

  });
};

export const stoptMongoose = async (): Promise<void> => {
  await mongoose.connection.close(() => {
    console.log('Stop Mongoose.');
  });
};
