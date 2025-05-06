import dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT || 3000;

import express from "express";
const app = express();
import cors from "cors";
import { connectToDatabase } from "./utils/db.js";

import indexRoutes from "./routes/index.routes.js";
import { agenda } from "./utils/agenda.js";

connectToDatabase();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/", indexRoutes);

app.listen(PORT, () => {
  console.log(`Listening on PORT ${PORT}`);
});
