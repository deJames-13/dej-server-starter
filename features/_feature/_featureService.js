import { Service } from '#common';
import _feature from './_featureModel.js';

class _featureService extends Service {
  model = _feature;
}

export default new _featureService();
