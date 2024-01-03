const { StatusCodes } = require("http-status-codes");
const { CityService } = require("../services");

const { SuccessResponse, ErrorResponse } = require("../utils/common");

async function createCity(req, res) {
  console.log("11111111111111111111111");
  console.log(req.body);
  try {
    const city = await CityService.createCity({
      name: req.body.name,
    });
    SuccessResponse.data = city;

    return res.status(StatusCodes.CREATED).json(SuccessResponse);
  } catch (error) {
    console.log("222222222222222222222222222222");

    console.log(error.statusCode);
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
}
module.exports = {
  createCity,
};
