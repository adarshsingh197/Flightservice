const { StatusCodes } = require("http-status-codes");
const { FlightRepository } = require("../repositories");
const { AppError } = require("../utils/errors");
const flightRepository = new FlightRepository();
const { datetimeHelpers } = require("../utils/helpers");
async function createFlight(data) {
  try {
    if (!datetimeHelpers.compareTime(data.arrivalTime, data.departureTime)) {
      throw new AppError(
        "Arrival time must be greater than departure time",
        StatusCodes.BAD_REQUEST
      );
    }
    //Departure and arrival airport cannot be same
    else if (data.departureAirportId == data.arrivalAirportId) {
      throw new AppError(
        "Departure and arrival airport reference cannot be same",
        StatusCodes.BAD_REQUEST
      );
    }
    const flight = await flightRepository.create(data);
    return flight;
  } catch (error) {
    if (
      error.name == "SequelizeValidationError" ||
      error.name == "SequelizeDatabaseError"
    ) {
      let explanation = [];
      console.log(error);
      error.errors.forEach((err) => {
        explanation.push(err.message);
      });
      console.log(explanation);

      throw new AppError(explanation, StatusCodes.BAD_REQUEST);
    }
    console.log("222222222222222222222222");

    throw new AppError(
      "Cannot create a new flight Object",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

module.exports = {
  createFlight,
};
