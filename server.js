import cookieParser from 'cookie-parser';
import express from 'express';
import { connectDB } from './config/db.js';
import { MONGO_URI, PORT } from './config/env.js';
import router from './routes/index.js';

const server = () => {
  const app = express();
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser());

  app.use('/api', router);

  app.get('/', (req, res) => {
    res.send('API is running...');
  });


  connectDB(MONGO_URI, () => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  });
};

server();
