
import * as mongoose from 'mongoose';
let connection: mongoose.Mongoose;

export const startMongoose = async (): Promise<mongoose.Mongoose> => {
  // Mongoose uses global Promise by default
  const mongoURL: string = `mongodb://localhost:27017/aws-lambda`;
  if (!connection) {
    console.log('Connect Mongodb:', mongoURL);
    connection = await mongoose.connect(
      mongoURL,
      { useNewUrlParser: true }
    );
  }
  return connection;
};

export const stoptMongoose = async (): Promise<void> => {
  await mongoose.connection.close(() => {
    console.log('Stop Mongoose.');
  });
};
