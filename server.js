import cookieParser from 'cookie-parser';
import express from 'express';
import path from 'path';
import { connectDB } from './config/index.js';
import { MONGO_URI, PORT } from './env/index.js';
import * as err from './middleware/errorMiddleware.js';
import router from './routes/index.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());
app.use('/api', router);

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

app.use(err.notFound);
app.use(err.errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

connectDB(MONGO_URI);
