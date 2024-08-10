import mongoose from 'mongoose';

const connectDB = async (uri) => {
  return mongoose
    .connect(uri)
    .then(() => {
      console.log('Connected to database');
    })
    .catch((e) => {
      console.log('Error connecting to database: ', e.message);
    });
};

export { connectDB };
