const { StatusCodes } = require("http-status-codes");

const info = (req, res) => {
  return res.status(StatusCodes).json({
    sucess: true,
    message: "API is live",
  });
};

module.exports = {
  info,
};
