import { FEATURES_URL } from '#constants';
import * as features from '#features';

const v1 = [
  {
    url: FEATURES_URL.USERS,
    router: features.userRoutes,
  },
];

export default v1;
