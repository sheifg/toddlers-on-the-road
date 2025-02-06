const { mongoose } = require("../config/dbConnection");

// Country Schema:
const PackListSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    description:{
        type: String,
        trim: true,
      },
    items: [],
    
  },
  { timestamps: true, collection: "packList" }
);

module.exports = mongoose.model("PackList", PackListSchema );

