const express = require("express");
const router = express.Router();

const { AirplaneController } = require("../../controllers");

const { AirplaneMiddlewares } = require("../../middlewares");

router.post(
  "/",
  AirplaneMiddlewares.ValidateRequest,
  AirplaneController.createAirplane
);

router.get("/", AirplaneController.getAirplanes);
router.get("/:id", AirplaneController.getAirplane);

router.delete("/:id", AirplaneController.destroyAirplane);

module.exports = router;
