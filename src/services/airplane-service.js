const { StatusCodes } = require("http-status-codes");
const { AirplaneRepository } = require("../repositories");
const { AppError } = require("../utils/errors");
const airplaneRepository = new AirplaneRepository();
async function createAirplane(data) {
  console.log("111111111");
  console.log(data);
  try {
    const airplane = await airplaneRepository.create(data);
  } catch (error) {
    if (error.name == "SequelizeValidationError") {
      let explanation = [];
      console.log(error);
      error.errors.forEach((err) => {
        explanation.push(err.message);
      });
      console.log(explanation);

      throw new AppError(explanation, StatusCodes.BAD_REQUEST);
    }

    throw new AppError(
      "Cannot create a new Airplane Object",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function getAirplanes() {
  try {
    const airplanes = await airplaneRepository.getAll();
    return airplanes;
  } catch (error) {
    throw new AppError(
      "Cannot fetch all data applicants",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function getAirplane(id) {
  try {
    const airplanes = await airplaneRepository.get(id);

    return airplanes;
  } catch (error) {
    if (error.statusCode == 404) {
      throw new AppError(
        "The airplane you requested is not present",
        error.statusCode
      );
    }
    throw new AppError(
      "Cannot fetch all data applicants",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function destroyAirplane(id) {
  try {
    const response = await airplaneRepository.destroy(id);

    return response;
  } catch (error) {
    if (error.statusCode == 404) {
      throw new AppError(
        "The airplane you requested to delete is not present",
        error.statusCode
      );
    }
    throw new AppError(
      "Cannot fetch all data applicants",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function UpdateAirplane() {
  try {
    const response = await airplaneRepository.destroy(id);

    return response;
  } catch (error) {
    if (error.statusCode == 404) {
      throw new AppError(
        "The airplane you requested to delete is not present",
        error.statusCode
      );
    }
    throw new AppError(
      "Cannot fetch all data applicants",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}
module.exports = {
  createAirplane,
  getAirplanes,
  getAirplane,
  destroyAirplane,
};
