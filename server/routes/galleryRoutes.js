const express = require("express");
const router = express.Router();
const { getPhotos, uploadPhoto, deletePhoto } = require("../controllers/galleryController");

router.get("/getAll", getPhotos);
router.post("/post", uploadPhoto);
router.delete("/delete/:photoId", deletePhoto);

console.log(getPhotos); // Should log the function if it's defined

module.exports = router;
