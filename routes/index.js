import { routesHandler } from '../utils/index.js';
import v1 from './v1/index.js';

const router = routesHandler([
  {
    url: '/v1',
    router: routesHandler(v1),
  },
]);

export default router;
