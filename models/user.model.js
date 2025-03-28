const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");

const userShema = new Schema({
  name: String,
  email: String,
  password: String,
  role: String
});

// In your user.model.js
userShema.methods.comparePassword = async function(candidatePassword) {
  if (!candidatePassword || !this.password) {
    throw new Error("Missing password for comparison");
  }
  return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model("userDB", userShema);

