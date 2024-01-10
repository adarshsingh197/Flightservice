const { StatusCodes } = require("http-status-codes");

const { ErrorResponse } = require("../utils/common");

function ValidateRequest(req, res, next) {
  if (!req.body.name) {
    ErrorResponse.message = "Something went wrog while creating airplane";
    ErrorResponse.error = {
      explanation: "ModelNumber not found",
    };
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }
  next();
}

module.exports = {
  ValidateRequest,
};
