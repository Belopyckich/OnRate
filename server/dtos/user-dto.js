module.exports = class UserDto {
  email;
  id;
  name;
  location;
  picture;
  dob;
  isActivated;

  constructor(model) {
    this.email = model.email;
    this.id = model.id;
    this.name = model.name;
    this.location = model.location;
    this.picture = model.picture;
    this.dob = model.dob;
    this.isActivated = model.isActivated;
  }
};
