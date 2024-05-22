const Photo = require("../models/Photo");
const path = require("path");

const getPhotos = async (req, res) => {
  try {
    const photos = await Photo.find(req.query);
    res.json(photos);
  } catch (error) {
    console.error("Failed to fetch photos:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Function to upload a photo
const uploadPhoto = async (req, res) => {
  const { imageUrl, uploadedBy, description } = req.body.params;

  console.log("imageUrl: ", imageUrl);
  console.log("description: ", description);

  if (!imageUrl || !uploadedBy) {
    return res.status(400).json({ message: "imageUrl and uploadedBy are required fields" });
  }

  try {
    const newPhoto = new Photo({
      imageUrl,
      uploadedBy,
      description,
    });
    const savedPhoto = await newPhoto.save();
    res.status(201).json(savedPhoto);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Function to delete a photo
const deletePhoto = async (req, res) => {
  try {
    console.log("req.params: ", req.params.photoId);
    const photo = await Photo.findById(req.params.photoId);
    if (!photo) {
      return res.status(404).json({ message: "Photo not found" });
    }

    await Photo.deleteOne({ _id: req.params.photoId });
    res.json({ message: "Photo deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete photo: " + error.message });
  }
};

// Exporting all the handlers at once
module.exports = {
  getPhotos,
  uploadPhoto,
  deletePhoto,
};
