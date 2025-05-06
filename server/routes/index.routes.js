import express from "express";
const router = express.Router();

import Sequence from "../models/sequence.js";
import Template from "../models/template.js";
import SourceList from "../models/source-list.js";

import { convertEmailStringToArray } from "../utils/helpers.js";
import { agenda } from "../utils/agenda.js";

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

router.post("/schedule", async (req, res) => {
  try {
    const { nodes, edges, scheduledDate, scheduledTime } = req.body;

    // Only finding a single node
    const leadNode = nodes.find((node) => node.type === "lead");

    // Filter all the template nodes
    const templateNodes = nodes.filter((node) => node.type === "emailTemplate");

    if (!leadNode) {
      throw new Error("No lead node");
    }

    if (!templateNodes.length) {
      throw new Error("No template node");
    }

    templateNodes.map(async (node) => {
      const delayValue = node.data.delay.delayValue;
      const delayType = node.data.delay.delayType;

      const data = {
        emails: leadNode.data.leadSource.emails.join(", "),
        template: node.data.template,
      };

      console.log(
        `Sending email to Lead: ${leadNode.data.label}\nDelay: ${
          !delayValue ? "0" : delayValue
        } ${!delayType ? "" : delayType}`
      );

      // Start agenda
      await agenda.start();

      if (!delayValue && !delayType) {
        // If there is no delay, send instantly
        await agenda.now("send email", data);
      } else {
        await agenda.schedule(
          `in ${delayValue} ${delayType}`,
          "send email",
          data
        );
      }
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

export default router;
