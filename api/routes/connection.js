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

module.exports = router;
