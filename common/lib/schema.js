import mongoose from 'mongoose';
export class Schema extends mongoose.Schema {
  constructor({ name, schema = [] }) {
    super(...schema);
    this.name = name;
  }
  static filterAllowedFields(data) {
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
    return mongoose.model(this.name, this);
  }
}
