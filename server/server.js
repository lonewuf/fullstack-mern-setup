import devBundle from "./devBundle";
import path from "path";
import template from "../template";
import { MongoClient } from "mongodb";
const express = require("express");

const app = express();
devBundle.compile(app);

const url = process.env.MONGO_URI || "mongodb://localhost:27017/simple-setup";
MongoClient.connect(url)
  .then((db) => {
    console.log("Connected successfuly on database");
    db.close();
  })
  .catch((err) => {
    console.log(`Error on connecting to database: ${err}`);
  });

const CURRENT_WORKING_DIR = process.cwd();
app.use("/dist", express.static(path.join(CURRENT_WORKING_DIR, "dist")));

app.get("/", (req, res) => {
  res.status(200).send(template());
});

let port = process.env.PORT || 3000;
app.listen(port, (err) => {
  if (err) {
    console.log(err);
  }
  console.info(`Server started on port ${port}`);
});
