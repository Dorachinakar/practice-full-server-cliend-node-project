const exp = require("constants");
const { readJsonSync, writeJsonSync } = require("fs-extra");
const express = require("express");
const app = express();
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // To parse the incoming requests with JSON payloads

//mongodb
const { MongoClient } = require("mongodb");
const url = "mongodb://localhost:27017";
const client = new MongoClient(url);

async function main(req,dbname,collectionn) {
  // Use connect method to connect to the server
  await client.connect();
  console.log("Connected successfully to server");
  const db = client.db(dbname);
  const collection = db.collection(collectionn);
 
  collection.insertMany([{ ...req }]);
  
  // the following code examples can be pasted here...

  return "done.";
}

/* app.get("/", function (req, res) {
  res.send("Hello World");
}); */
app.post("/contacts", (req, res, next) => {
  try {
    let jsonNames = readJsonSync("./public/names.json");
    jsonNames.push({ ...req.body });
    writeJsonSync("./public/names.json", jsonNames);
  } catch (error) {
    res.json({ sucess: false, ...req.body });
  }
  res.json({ sucess: true, ...req.body });
});
app.post("/contact-us", (req, res) => {
  main(req.body,"contacts","contact");
  res.send(req.body);
});

app.post("/reminders", (req, res) => {
  
main(req.body,"contacts","reminders")
res.send("hi")});
app.listen(4000);
