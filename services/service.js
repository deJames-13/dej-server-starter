export default class Service {
  // functions for services
  model = null;
  _checkModel() {
    if (!this.model) throw new Error('Model not set');
  }

  async checkIfExists(filter) {
    this._checkModel();
    const record = await this.model.exists(filter);
    if (record) return record;
    return null;
  }

  async getAll() {
    this._checkModel();
    return this.model.find();
  }

  async getById(id) {
    this._checkModel();
    return this.model.findById(id);
  }

  async getOne(filter) {
    this._checkModel();
    return this.model.findOne(filter);
  }

  async filter(filter) {
    this._checkModel();
    return this.model.find(filter);
  }

  async create(body) {
    this._checkModel();
    const data = this.model.filterFillables(body);
    return this.model.create(data);
  }

  async update(id, body) {
    this._checkModel();
    const data = this.model.filterFillables(body);
    return this.model.findByIdAndUpdate(id, data, { new: true });
  }

  async delete(id) {
    this._checkModel();
    return this.model.findByIdAndDelete(id);
  }
}
