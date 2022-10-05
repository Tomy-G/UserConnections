const router = require("express").Router();
const userSchema = require("../models/User");
const connectionSchema = require("../models/Connection");
const mongoose = require("mongoose");

// get all users
router.get("/users", (req, res) => {
  userSchema
    .find()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

//create user
router.post("/create-user", (req, res) => {
  const user = userSchema(req.body);
  user
    .save()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

// get a user
router.get("/user", (req, res) => {
  const { id } = req.query;
  userSchema
    .findById(id)
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

//add connection to user
router.put("/update-user", (req, res) => {
  const user1 = req.query.user1;
  const user2 = req.query.user2;
  console.log(user1 + " " + user2);
  userSchema
    .findById(user1)
    .then((data) => {
      if (!data.connections.includes(mongoose.Types.ObjectId(user2))) {
        data.connections.push(mongoose.Types.ObjectId(user2));
        data.save();
      }
      res.json(data);
    })
    .catch((error) => res.json({ message: error }));
});

module.exports = router;
