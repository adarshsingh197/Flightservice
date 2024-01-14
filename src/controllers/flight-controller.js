const { StatusCodes } = require("http-status-codes");
const { FlightService } = require("../services");

const { SuccessResponse, ErrorResponse } = require("../utils/common");

async function createFlight(req, res) {
  console.log(req.body);
  try {
    const flight = await FlightService.createFlight({
      flightNumber: req.body.flightNumber,
      airplaneId: req.body.airplaneId,
      departureAirportId: req.body.departureAirportId,
      arrivalAirportId: req.body.arrivalAirportId,
      arrivalTime: req.body.arrivalTime,
      departureTime: req.body.departureTime,
      price: req.body.price,
      boardingGate: req.body.boardingGate,
      totalSeats: req.body.totalSeats,
    });
    SuccessResponse.data = flight;

    return res.status(StatusCodes.CREATED).json(SuccessResponse);
  } catch (error) {
    console.log("1212121212");
    console.log(error);
    console.log(error.statusCode);
    console.log("11111111111111111111111111111111111111111111");
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
}

async function getAllFlights(req, res) {
  try {
    const flights = await FlightService.getAllFlights(req.query);
    SuccessResponse.data = flights;
    return res.status(StatusCodes.CREATED).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
}

module.exports = {
  createFlight,
  getAllFlights,
};
