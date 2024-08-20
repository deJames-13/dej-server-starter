import { connectDB, MONGO_URI, PORT } from '#config';
import * as error from '#middlewares/error.middleware';
import cookieParser from 'cookie-parser';
import express from 'express';
import path from 'path';
import router from './routes/index.js';

const production = (app) => {
  if (process.env.NODE_ENV === 'production') {
    const __dirname = path.resolve();
    const root_folder = path.join(__dirname, '../');

    app.use(express.static(path.join(root_folder, 'frontend/dist')));

    app.get('*', (req, res) => {
      res.sendFile(path.join(root_folder, 'frontend/dist/index.html'));
    });
  } else {
    app.get('/', (req, res) => {
      res.send('API is running...');
    });
  }
};

const server = () => {
  const app = express();

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser());

  app.use('/api', router);

  production(app);

  app.use(error.notFound);
  app.use(error.errorMiddleware);

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
connectDB(MONGO_URI, server);
