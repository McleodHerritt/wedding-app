const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userRouter = require("./routes/userRoutes");
const rsvpRouter = require("./routes/rsvpRoutes");
const galleryRouter = require("./routes/galleryRoutes");
const multer = require("multer");
const path = require("path");
const Photo = require("./models/Photo");
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/rsvps", rsvpRouter);
app.use("/gallery", galleryRouter);
app.use("/users", userRouter);
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));
app.use("/delete", express.static(path.join(__dirname, "/delete")));

require("dotenv").config();

const port = process.env.PORT || 5000;

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "/uploads"));
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

app.post("/upload", upload.single("photo"), async (req, res) => {
  if (req.file) {
    console.log("File uploaded successfully");
    const newPhoto = new Photo({
      imageUrl: req.file.filename,
      uploadedBy: req.body.uploadedBy,
      description: req.body.description,
    });

    try {
      await newPhoto.save();
      res.status(201).json(newPhoto);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  } else {
    console.log("File upload failed");
    return res.status(500).send("File upload failed");
  }
});

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB connection established"))
  .catch((error) => console.error("MongoDB connection failed:", error.message));

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});

app.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const rsvp = await RSVP.findById(id);
    await rsvp.delete();
    res.status(204).send();
  } catch (error) {
    res.status(404).send({ message: "RSVP not found" });
  }
});
