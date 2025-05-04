const express = require("express");
const router = express.Router();

const Sequence = require("../models/sequence");

router.post("/create", async (req, res) => {
  const { userId, name, description } = req.body;

  const result = await Sequence.create({
    userId: userId,
    name: name,
    description: description,
  });

  res.json({
    sequenceId: result._id,
  });
});

module.exports = router;
