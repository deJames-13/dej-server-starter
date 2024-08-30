import mongoose from 'mongoose';
export class Schema extends mongoose.Schema {
  constructor({ name, schema = [] }) {
    super(...schema);
    this.name = name;
  }
  filterFillables(data) {
    if (!this.fillables?.length) return data;

    return Object.keys(data).reduce((acc, key) => {
      if (this.fillables.includes(key)) acc[key] = data[key];
      return acc;
    }, {});
  }

  toJSON() {
    const obj = this.toObject();
    if (!this.constructor.hidden?.length) return obj;

    this.constructor.hidden.forEach((field) => {
      delete obj[field];
    });

    return obj;
  }

  makeModel() {
    this.statics.filterFillables = this.filterFillables;

    const model = mongoose.model(this.name, this);
    return model;
  }
}
