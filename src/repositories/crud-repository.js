const { StatusCodes } = require("http-status-codes");
const { Logger } = require("../config");
const { AppError } = require("../utils/errors");

class CrudRepository {
  constructor(model) {
    this.model = model;
  }

  async create(data) {
    const response = await this.model.create(data);
    return response;
  }

  async destroy(data) {
    const response = await this.model.destroy({
      where: {
        id: data,
      },
    });
    if (!response) {
      throw new AppError(
        "Not able to found the service",
        StatusCodes.NOT_FOUND
      );
    }
    return response;
  }
  async get(data) {
    const response = await this.model.findByPk(data);

    if (!response) {
      throw new AppError(
        "Not able to found the service",
        StatusCodes.NOT_FOUND
      );
    }
    return response;
  }

  async getAll() {
    const response = await this.model.findAll();
    return response;
  }

  async update(id, data) {
    try {
      const response = await this.model.update(data, {
        where: {
          id: id,
        },
      });
      return response;
    } catch (error) {
      Logger.error("something went wrong in the crud repo");
      throw error;
    }
  }
}

module.exports = CrudRepository;