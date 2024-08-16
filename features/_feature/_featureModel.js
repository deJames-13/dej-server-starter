import { Model } from '#common';

const _featureSchema = [];

const _feature = new Model({ name: '_feature', schema: _featureSchema });

_feature.statics.fillables = [];
_feature.statics.hidden = [];

export default _feature.makeModel();
