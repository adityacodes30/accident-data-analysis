import express from "express";
import * as dotenv from "dotenv"; //
import cors from "cors";
dotenv.config(); //
const app = express();
app.use(express.json());
app.use(cors());

import fs from "fs";
import csv from "csv-parser";

///mongo connection
import { kspDB } from "./db.js";

// const coll = kspDB.collection("data");

app.get("/", (req, res) => {
  console.log("get req");
  res.status(200);
  res.json({ message: "operational" });
});

// login route

app.post("/login", (req, res) => {
  console.log("on login route");
  var data = JSON.parse(req.body);
  var username = data.username;
  var password = data.password;
  var locationPinCode = data.locationPinCode;

  // to add database implementation here

  try {
  } catch {}
});

app.get("/dataDashboard", (req, res) => {});

// var arr = [];

// var counter = 0;


//   fs.createReadStream("./Dataset.csv")
//     .pipe(csv())
//     .on("data", async function (data) {
//         counter++;
//         const doc = {
//           districtName: data.DISTRICTNAME,
//           unitName: data.UNITNAME,
//           year: data.Year,
//           accidentSpot: data.Accident_Spot,
//           accidentSublocation: data.Accident_SubLocation,
//           severity: data.Severity,
//           roadCharacter: data.Road_Character,
//           roadType: data.Road_Type,
//           weather: data.Weather,
//           latitude: data.Latitude,
//           longitude: data.Longitude,
//           month: data.Month,
//           age: data.age,
//           sex: data.Sex,
//           personType: data.PersonType,
//         };
//         arr.push(doc);
        
//         coll.insertOne(doc)
      
//     })
//     .on("end", function () {
//       console.log(arr.length)
//     });

app.get("/formdata", async function (req, res) {
  console.log("on formdata route");
  try {
    const formdatacoll = kspDB.collection("form-data");
    const result = await formdatacoll.find({}).toArray();
    // console.log(result.toString());
    res.status(200).json(result[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.post("/form_sub", async function (req, res) {
  console.log("on form_sub route");
  try {
    const formSubColl = kspDB.collection("form-sub");
    const result = await formSubColl.insertOne(req.body);
    res.status(200).json({ message: "Form submitted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default app;
