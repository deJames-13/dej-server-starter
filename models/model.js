import mongoose from 'mongoose';
class Model extends mongoose.Schema {
  constructor({ name, schema = [] }) {
    super(...schema);
    this.name = name;

    this.statics.filterFillables = (data) => {
      if (!this.statics.fillables?.length) return data;

      return Object.keys(data).reduce((acc, key) => {
        if (this.statics.fillables.includes(key)) acc[key] = data[key];
        return acc;
      }, {});
    };

    this.methods.toJSON = function () {
      const obj = this.toObject();
      if (!this.constructor.hidden?.length) return obj;

      this.constructor.hidden.forEach((field) => {
        delete obj[field];
      });

      return obj;
    };

    return this;
  }

  makeModel() {
    return mongoose.model(this.name, this);
  }
}

export default Model;
