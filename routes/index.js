import { VERSIONS } from '#constants';
import { routesHandler } from '#utils';
import v1 from './v1.js';

const router = routesHandler([
  {
    url: VERSIONS.V1,
    router: routesHandler(v1),
  },
]);

export default router;
