export default class Service {
  // static functions for services
  static model = null;
  static _checkModel() {
    if (!this.model) throw new Error('Model not set');
  }

  static async getAll() {
    this._checkModel();
    return this.model.find();
  }

  static async getById(id) {
    this._checkModel();
    return this.model.findById(id);
  }

  static async getOne(filter) {
    this._checkModel();
    return this.model.findOne(filter);
  }

  static async filter(filter) {
    this._checkModel();
    return this.model.find(filter);
  }

  static async create(body) {
    this._checkModel();
    const data = this.model.filterFillables(body);
    return this.model.create(data);
  }

  static async update(id, body) {
    this._checkModel();
    const data = this.model.filterFillables(body);
    return this.model.findByIdAndUpdate(id, data, { new: true });
  }

  static async delete(id) {
    this._checkModel();
    return this.model.findByIdAndDelete(id);
  }
}
