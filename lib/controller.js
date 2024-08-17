import * as utils from '#utils';
export class Controller {
  service;
  resource;
  error = utils.errorHandler;
  success = utils.successHandler;
  validator = utils.validate;

  // controller functions
  getALl = async (req, res) => {
    const data = await this.service?.getAll();
    if (!data.length) return this.error({ res, message: 'No data found!' });

    const resource = this.resource?.collection(data) || data;
    this.success({ res, message: 'Data collection fetched!', resource });
  };

  getById = async (req, res) => {
    const data = await this.service?.getById(req.params.id);
    if (!data?._id) return this.error({ res, message: 'Data not found!' });

    const resource = this.resource?.make(data) || data;
    this.success({ res, message: 'Data fetched!', resource });
  };

  store = async (req, res) => {
    const validData = await this.validator(req, res, this.service?.createRules);
    const data = await this.service?.create(validData);
    if (!data._id) return this.error({ res, message: 'Invalid data!' });

    const resource = this.resource?.make(data) || data;
    this.success({ res, message: 'Data created!', resource });
  };

  update = async (req, res) => {
    const validData = await this.validator(req, res, this.service?.updateRules);
    const data = await this.service?.update(req.params.id, validData);
    if (!data._id) return this.error({ res, message: 'Invalid data!' });

    const resource = this.resource?.make(data) || data;
    this.success({ res, message: 'Data updated!', resource });
  };

  delete = async (req, res) => {
    const data = await this.service?.delete(req.params.id);
    if (!data?._id) return this.error({ res, message: 'Data not found!' });

    this.success({ res, message: 'Data deleted!' });
  };
}
