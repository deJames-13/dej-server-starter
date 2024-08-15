import * as utils from '../utils/index.js';
export default class Controller {
  error = utils.errorHandler;
  success = utils.successHandler;
  validator = utils.validate;
  service;
  resource;

  // controller functions
  getALl = async (req, res) => {
    const data = await this.service.getAll();
    if (!data.length) return this.error({ res, message: 'No data found!' });

    const resource = this.resource?.collection(data) || data;
    this.success({ res, message: 'Data collection fetched!', resource });
  };

  getById = async (req, res) => {
    const data = await this.service.getById(req.params.id);
    if (!data?._id) return this.error({ res, message: 'Data not found!' });

    const resource = this.resource?.make(data) || data;
    this.success({ res, message: 'Data fetched!', resource });
  };
}
