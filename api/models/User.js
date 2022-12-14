const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    name: {
      _id: String,
      type: String,
      required: true,
    },
    connections : [{type: mongoose.Schema.Types.ObjectId, ref: 'Connection'}]
  });
  
  module.exports = mongoose.model('User', userSchema);