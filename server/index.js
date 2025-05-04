require("dotenv").config();

const PORT = process.env.PORT || 3000;

const express = require("express");
const app = express();
const cors = require("cors");
const { connectToDatabase } = require("./utils/db");

const indexRoutes = require("./routes/index.routes");

connectToDatabase();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/", indexRoutes);

app.listen(PORT, () => {
  console.log(`Listening on PORT ${PORT}`);
});
