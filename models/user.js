const mongoose = require("mongoose");

const usersSchema = new mongoose.Schema(
  {
    user: { type: String },
    mail: { type: String },
    password: { type: String },
    dni: { type: String },
    type: { type: String },
  },
  { collection: "User" }
);

module.exports = mongoose.model("user", usersSchema);
