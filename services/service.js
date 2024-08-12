export default class Service {
  // static functions for services
  static model = null;

  static async getAll() {
    if (!this.model) throw new Error('Model not set');
    return await this.model.find();
  }

  static async getById(id) {
    if (!this.model) throw new Error('Model not set');
    return await this.model.findById(id);
  }

  static async getOne(filter) {
    if (!this.model) throw new Error('Model not set');
    return await this.model.findOne(filter);
  }

  static async filter(filter) {
    if (!this.model) throw new Error('Model not set');
    return await this.model.find(filter);
  }

  static async create(body) {
    if (!this.model) throw new Error('Model not set');
    const data = this.model.filterFillables(body);
    return await this.model.create(data);
  }

  static async update(id, body) {
    if (!this.model) throw new Error('Model not set');
    const data = this.model.filterFillables(body);
    return await this.model.findByIdAndUpdate(id, data, { new: true });
  }

  static async delete(id) {
    if (!this.model) throw new Error('Model not set');
    return await this.model.findByIdAndDelete(id);
  }
}
