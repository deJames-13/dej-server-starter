import { Resource } from '#common';
export default class _featureResource extends Resource {
  transform(_feature) {
    return _feature.toObject();
  }
}
