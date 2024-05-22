const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const photoSchema = new Schema(
  {
    imageUrl: { type: String, required: true },
    uploadedBy: { type: String, required: true },
    description: { type: String, required: false },
  },
  {
    timestamps: true,
  }
);

const Photo = mongoose.model("Photo", photoSchema);

module.exports = Photo;
