const { mongoose } = require("../config/dbConnection");

// Country Schema:
const CountrySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    images: [],
    language: {
      type: String,
      trim: true,
      required: true,
    },
    capital_City: {
      type: String,
      trim: true,
      required: true,
    },
    religion: {
      type: String,
      trim: true,
      required: true,
    },
    currency: {
      type: String,
      trim: true,
      required: true,
    },
    cultural_Info: {
      type: String,
      trim: true,
      required: true,
    },
    food_Specialties: {
      type: String,
      trim: true,
      required: true,
    },
    emergency_Contacts: {
      type: String,
      trim: true,
      required: true,
    },
  },
  { timestamps: true, collection: "country" }
);

module.exports = mongoose.model("Country", CountrySchema);

