const router = require("express").Router();
const connectionSchema = require("../models/Connection");

//add connection
router.post("/add-connection/", (req, res) => {
  const connection = connectionSchema(req.body);

  connection
    .save()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

//delete a connection
router.delete("/connection", (req, res) => {
  const { user1, user2 } = req.query;
  connectionSchema
    .deleteOne({ user1: user1, user2: user2 })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

// get all connections
router.get("/connections", (req, res) => {
  connectionSchema
    .find()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

//get oldest connection
router.get("/oldest", (req, res) => {
  connectionSchema
    .find()
    .sort({ _id: -1 })
    .limit(1)
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

//get newest connection
router.get("/newest", (req, res) => {
  connectionSchema
    .find()
    .sort({ _id: 1 })
    .limit(1)
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

module.exports = router;
