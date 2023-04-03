const ApiError = require("../exceptions/api-error");
const ResponseDto = require("../dtos/response-dto");

module.exports = function (err, req, res, next) {
  if (err instanceof ApiError) {
    return res.status(err.status).json(
      new ResponseDto({
        success: false,
        data: { message: err.message, errors: err.errors },
      })
    );
  }

  return res.status(500).json(
    new ResponseDto({
      success: false,
      data: { message: "Непредвиденная ошибка" },
    })
  );
};
