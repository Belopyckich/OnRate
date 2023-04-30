const { Schema, model } = require("mongoose");

const UserSchema = new Schema({
  email: { type: String, unique: true, required: true },
  password: { type: String, requred: true },
  name: { type: String, requred: true },
  location: {
    type: {
      city: { type: String, unique: false, required: false },
      country: { type: String, unique: false, required: false },
    },
    required: false,
  },
  picture: {
    type: {
      large: { type: String, unique: false, required: false },
      medium: { type: String, unique: false, required: false },
      thumbnail: { type: String, unique: false, required: false },
    },
    required: false,
  },
  dob: { type: String, required: false },
  isActivated: { type: Boolean, default: false },
  activationLink: { type: String },
  startPage: { type: String },
  background: { type: String },
});

module.exports = model("User", UserSchema);
