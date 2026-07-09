const express = require("express");
const serverless = require("serverless-http");
const fileUpload = require("express-fileupload");
const cors = require("cors");
const bodyParser = require("body-parser");

require("dotenv").config();
require("../models/connect_monggoatlas");
// require("../config/myMediaGDrive");

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  }),
);

// Mount router at /api so it matches the redirect rule in netlify.toml
app.use("/api", require("../routers/api/route"));

module.exports.handler = serverless(app);
