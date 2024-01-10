const { StatusCodes } = require("http-status-codes");
const { AirportRepository } = require("../repositories");
const { AppError } = require("../utils/errors");
const airportRepository = new AirportRepository();
async function createAirport(data) {
  console.log("111111111");
  console.log(data);
  try {
    const airport = await airportRepository.create(data);
    return airport;
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
      "Cannot create a new airport Object",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function getAirports() {
  try {
    const airport = await airportRepository.getAll();
    return airport;
  } catch (error) {
    throw new AppError(
      "Cannot fetch all data applicants",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function getAirport(id) {
  try {
    const airport = await airportRepository.get(id);

    return airport;
  } catch (error) {
    if (error.statusCode == 404) {
      throw new AppError(
        "The airport you requested is not present",
        error.statusCode
      );
    }
    throw new AppError(
      "Cannot fetch all data applicants",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function destroyAirport(id) {
  try {
    const response = await airportRepository.destroy(id);

    return response;
  } catch (error) {
    if (error.statusCode == 404) {
      throw new AppError(
        "The airport you requested to delete is not present",
        error.statusCode
      );
    }
    throw new AppError(
      "Cannot fetch all data applicants",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function UpdateAirport() {
  try {
    const response = await airportRepository.destroy(id);

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
  createAirport,
  getAirports,
  getAirport,
  destroyAirport,
  UpdateAirport,
};
