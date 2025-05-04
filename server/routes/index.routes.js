const express = require("express");
const router = express.Router();

const Sequence = require("../models/sequence");

router.post("/sequence", async (req, res) => {
  try {
    const { sequenceId, userId } = req.body;

    if (!userId) {
      res.status(400).json({
        message: "No user was found",
      });

      return;
    }

    if (!sequenceId) {
      res.status(400).json({
        message: "No id was sent from the client",
      });
      return;
    }

    const sequence = await Sequence.findOne({
      _id: sequenceId,
      userId: userId,
    });

    if (!sequence) {
      res.status(400).json({
        message: "No sequence was found associated with this id",
      });

      return;
    }

    res.status(200).json({
      sequence,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

router.post("/create/sequence", async (req, res) => {
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

router.post("/source-list", async (req, res) => {});

router.post("/create/source-list", async (req, res) => {});

module.exports = router;
