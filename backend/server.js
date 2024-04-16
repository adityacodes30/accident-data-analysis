import axios from 'axios';
import express from "express";
import * as dotenv from "dotenv"; //
import cors from "cors";
dotenv.config(); //
const app = express();
app.use(express.json());
app.use(cors());

// import fs from "fs";
// import csv from "csv-parser";

///mongo connection

// import { MongoClient, ServerApiVersion } from "mongodb";
// import { log } from "console";
import { kspDB } from "./db.js";
// const uri ="mongodb+srv://adityaework:t9oA9XrMtGHrZcQI@cluster0.me5pggj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const coll = kspDB.collection("data");

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

  try {
  } catch {}
});

app.get("/dataDashboard", (req, res) => {});

app.get("/count", async (req, res) => {
  try {
    const maleCount = await coll.countDocuments({ sex: "MALE" });
    const femaleCount = await coll.countDocuments({ sex: "FEMALE" });
    res.json({ maleCount, femaleCount });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred" });
  }
});

app.get("/ageRangeCount", async (req, res) => {
  try {
    const range1Count = await coll.countDocuments({ age: { $gte: 18, $lt: 30 } });
    const range2Count = await coll.countDocuments({ age: { $gte: 30, $lt: 45 } });
    const range3Count = await coll.countDocuments({ age: { $gte: 45, $lt: 60 } });
    res.json({ range1Count, range2Count, range3Count });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred" });
  }
});

app.get("/accidentSpotCount", async (req, res) => {
  try {
    const spotTypes = [
      "Curves",
      "Other",
      "Narrow road",
      "Cross roads",
      "Y Junction",
      "T Junction",
      "Circle",
      "Junction",
      "Culvert",
      "Offset",
      "Bridge",
      "Road hump or Rumble strips",
      "Bottleneck",
      "Round about or Circle",
      "More than four arms",
      "Railway crossing",
      "Rail Crossing manned",
      "Staggered junction",
      "Rail Crossing Unmanned",
      "Straight and flat"
    ];

    let spotCounts = {};

    for (let spot of spotTypes) {
      const count = await coll.countDocuments({ accidentSpot: spot });
      spotCounts[spot] = count;
    }

    res.json(spotCounts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred" });
  }
});

app.get("/roadTypeCount", async (req, res) => {
  try {
    const roadTypes = [
      "State Highway",
      "NH",
      "Arterial",
      "Major District Road",
      "Minor District Road",
      "Two way",
      "Service Road",
      "Residential Street",
      "City or Town Road",
      "Village Road",
      "One way",
      "Sub Arterial",
      "Feeder Road",
      "Mixed",
      "Expressway",
      "Forest Road"
    ];
    let roadCounts = {};
    for (let road of roadTypes) {
      const count = await coll.countDocuments({ roadType: road });
      roadCounts[road] = count;
    }
    res.json(roadCounts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred" });
  }
});

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
    const resp = await axios.post('http://localhost:5000/cluster',{
      'Month': [parseInt(req.body.form_values.month, 10)],
    'Accident_Spot': [req.body.form_values.Accident_Spot],                       
    'Accident_SubLocation': [req.body.form_values.Accident_SubLocation],
    'Road_Type': [req.body.form_values.Road_Type],
  })
    const result = await formSubColl.insertOne(req.body);
    res.status(200).json({"ml" : resp.data, "db":result});
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.post("/check_unsafe_road", async (req,res)=>{
  const resp = await axios.post('http://localhost:9292/check_unsafe_road', req.body);
  res.json(resp.data);
})

app.post("/chatbot", async (req,res)=>{
  const resp = await axios.post('http://localhost:8765/query', req.body);
  res.json(resp.data);
}
)
export default app;
