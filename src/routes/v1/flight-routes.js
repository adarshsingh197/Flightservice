const express = require("express");
const router = express.Router();

const { FlightController } = require("../../controllers");

const { AirportMiddlewares } = require("../../middlewares");

console.log("hellllllllllllllllllllllllllllll");
router.post("/", FlightController.createFlight);
router.get("/", FlightController.getAllFlights);

module.exports = router;
