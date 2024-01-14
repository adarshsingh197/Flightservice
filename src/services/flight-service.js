const { StatusCodes } = require("http-status-codes");
const { FlightRepository } = require("../repositories");
const { AppError } = require("../utils/errors");
const flightRepository = new FlightRepository();
const { datetimeHelpers } = require("../utils/helpers");
const { Op } = require("sequelize");
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

async function getAllFlights(query) {
  let customFilter = {};
  let sortFilter = [];
  if (query.trips) {
    [departureAirportId, arrivalAirportId] = query.trips.split("-");
    customFilter.departureAirportId = departureAirportId;
    customFilter.arrivalAirportId = arrivalAirportId;
  }
  if (query.price) {
    [minPrice, maxPrice] = query.price.split("-");
    customFilter.price = {
      [Op.between]: [minPrice, maxPrice == undefined ? 20000 : maxPrice],
    };
  }
  if (query.travellers) {
    customFilter.totalSeats = {
      [Op.gte]: query.travellers,
    };
  }
  if (query.tripDate) {
    customFilter.departureTime = {
      [Op.eq]: query.tripDate,
    };
  }
  if (query.sort) {
    console.log("232323232323");
    const params = query.sort.split(",");
    console.log(params);
    const sortFilters = params.map((param) => param.split("_"));
    console.log(sortFilters);
    sortFilter = sortFilters;
  }
  try {
    const flights = await flightRepository.getAllFlights(
      customFilter,
      sortFilter
    );
    return flights;
  } catch (error) {
    throw new AppError(
      "Cannot fetxh data of all the flights",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }

  //tripes =MUM-Del
}

module.exports = {
  createFlight,
  getAllFlights,
};
