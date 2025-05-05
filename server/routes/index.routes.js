const express = require("express");
const router = express.Router();

const Sequence = require("../models/sequence");
const SourceList = require("../models/source-list");
const Template = require("../models/template");

const { convertEmailStringToArray } = require("../utils/helpers");

router.get("/sequence", async (req, res) => {
  try {
    const sequences = await Sequence.find();

    if (!sequences) {
      res.json({ message: "No sequence was found" });
    }

    res.json({
      sequences,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

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

router.post("/templates", async (req, res) => {
  try {
    const { userId } = req.body;

    const templates = await Template.find({ userId: userId });

    if (!templates) {
      throw new Error("No templates were found");
    }

    res.json({
      templates,
    });
  } catch (error) {
    res.status(500).json(error.message);
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

router.get("/source-lists", async (req, res) => {
  try {
    const sourceLists = await SourceList.find();

    res.json({
      sourceLists,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

router.post("/create/source-list", async (req, res) => {
  try {
    const { sourceListName, emails } = req.body;

    if (!sourceListName || !emails) {
      throw new Error("Source list name or email was not found");
    }

    // Create an array from the string
    const emailArray = convertEmailStringToArray(emails);

    // Create a source list
    const result = await SourceList.create({
      name: sourceListName,
      emails: emailArray,
    });

    res.json({
      sourceList: result,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

router.post("/create/template", async (req, res) => {
  try {
    const { templateName, offerName, subject, email, userId } = req.body;

    if (!userId) {
      throw new Error("You need to be signed in to create a template");
    }

    if (!templateName || !offerName || !subject || !email) {
      throw new Error("All the fields are mandatory");
    }

    const template = await Template.create({
      templateName,
      offerName,
      email,
      subject,
      userId,
    });

    res.json({
      template,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;
