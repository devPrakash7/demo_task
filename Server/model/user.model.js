const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  username: String,
  password: String,
  city: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'City',
  },
});

const User = mongoose.model('User', userSchema);

module.exports = {User};