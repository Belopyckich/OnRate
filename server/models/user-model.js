const { Schema, model } = require("mongoose");

const UserSchema = new Schema({
  email: { type: String, unique: true, required: true },
  password: { type: String, requred: true },
  name: {
    type: {
      title: { type: String, unique: false, required: false },
      first: { type: String, unique: false, required: false },
      last: { type: String, unique: false, required: false },
    },
    required: false,
  },
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
  dob: {
    type: {
      date: { type: String, unique: false, required: false },
      age: { type: Number, unique: false, required: false },
    },
    required: false,
  },
  isActivated: { type: Boolean, default: false },
  activationLink: { type: String },
});

module.exports = model("User", UserSchema);
