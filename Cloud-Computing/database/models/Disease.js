const mongoose = require('mongoose');

const diseaseSchema = new mongoose.Schema({
  id_disease: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  recommended_action: {
    type: String,
    required: true,
  },
});

const Disease = mongoose.model('Disease', diseaseSchema);

module.exports = Disease;
