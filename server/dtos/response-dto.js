module.exports = class ResponseDto {
  success;
  data;

  constructor(model) {
    this.success = model.success;
    this.data = model.data;
  }
};
