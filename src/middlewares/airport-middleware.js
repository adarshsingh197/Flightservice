const { StatusCodes } = require("http-status-codes");

const { ErrorResponse } = require("../utils/common");
const { AppError } = require("../utils/errors");

function ValidateRequest(req, res, next) {
  if (req.body.name && req.body.code && req.body.cityId) {
    next();
  }
  ErrorResponse.message = "Something went wrog while creating airport";
  if (!req.body.name) {
    ErrorResponse.error = new AppError(
      ["name not found in the upcoming request"],
      StatusCodes.BAD_REQUEST
    );
  }
  if (!req.body.code) {
    ErrorResponse.error = new AppError(
      ["code not found in the upcoming request"],
      StatusCodes.BAD_REQUEST
    );
  }
  if (!req.body.cityId) {
    ErrorResponse.error = new AppError(
      ["cityId not found in the upcoming request"],
      StatusCodes.BAD_REQUEST
    );
  }
  return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
}

module.exports = {
  ValidateRequest,
};
