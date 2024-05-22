const express = require("express");
const router = express.Router();
const userController = require("../controllers/userControllers");

// Routes for user operations
router.get("/", userController.getAllUsers);
router.get("/:id", userController.getUserById);
router.post("/add", userController.createUser);
router.put("/update/:id", userController.updateUser);
router.delete("/delete/:id", userController.deleteUser);

// Get all users
router.route("/").get((req, res) => {
  User.find()
    .then((users) => res.json(users))
    .catch((err) => res.status(400).json("Error: " + err));
});

// Add a new user
router.route("/add").post((req, res) => {
  const username = req.body.username;
  const email = req.body.email;

  const newUser = new User({ username, email });

  newUser
    .save()
    .then(() => res.json("User added!"))
    .catch((err) => res.status(400).json("Error: " + err));
});
// Get all users
router.route("/").get((req, res) => {
  User.find()
    .then((users) => res.json(users))
    .catch((err) => res.status(400).json("Error: " + err));
});

// Add a new user
router.route("/add").post((req, res) => {
  const username = req.body.username;
  const email = req.body.email;

  const newUser = new User({ username, email });

  newUser
    .save()
    .then(() => res.json("User added!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
