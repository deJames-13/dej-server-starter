import mongoose from 'mongoose';

const connectDB = async (uri, success = () => {}) => {
  return mongoose
    .connect(uri)
    .then(() => {
      console.log('Connected to database using connection: ' + uri);
      success();
    })
    .catch((e) => {
      console.log('Error connecting to database: ', e.message);
    });
};

export { connectDB };
