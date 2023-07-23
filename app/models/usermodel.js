const { schema, default: mongoose } = require("mongoose");

const Schema = mongoose.Schema(
  {
    nama: String,
    email: String,
    password: String,
    refresh_token: String,
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", Schema);
module.exports = User;