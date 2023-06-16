const mongoose = require('mongoose');

// Crops Schema
const cropsSchema = new mongoose.Schema({
  id_type_crops: {
    type: Number,
    required: true,
  },
  name_crops: {
    type: String,
    required: true,
  },
});

const Crops = mongoose.model('Crops', cropsSchema);

// Crops Disease Schema
const cropsDiseaseSchema = new mongoose.Schema({
  id_disease: {
    type: Number,
    required: true,
  },
  id_type_crops: {
    type: Number,
    required: true,
  },
  image_disease: {
    type: String,
    required: true,
  },
  name_disease: {
    type: String,
    required: true,
  },
  category_disease: {
    type: String,
    required: true,
  },
  desc_disease: {
    type: String,
    required: true,
  },
  recAction_disease: {
    type: String,
    required: true,
  },
  causeOf_disease: {
    type: String,
    required: true,
  },
});

const CropsDisease = mongoose.model('CropsDisease', cropsDiseaseSchema);

// Crops Recommendation Schema
const cropsRecommendationSchema = new mongoose.Schema({
  id_crops: {
    type: Number,
    required: true,
  },
  name_crops: {
    type: String,
    required: true,
  },
  image_crops: {
    type: String,
    required: true,
  },
  time_crops: {
    type: String,
    required: true,
  },
  alert_crops: {
    type: String,
    required: true,
  },
  desc_crops: {
    type: String,
    required: true,
  },
});

const CropsRecommendation = mongoose.model('CropsRecommendation', cropsRecommendationSchema);

module.exports = {
  Crops,
  CropsDisease,
  CropsRecommendation,
};
