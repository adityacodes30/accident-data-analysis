import express from "express";
import * as dotenv from "dotenv"; //
dotenv.config(); //
const app = express();
app.use(express.json());

import fs from "fs";
import csv from "csv-parser";

///mongo connection

import { MongoClient, ServerApiVersion } from "mongodb";

const uri ="mongodb+srv://adityaework:t9oA9XrMtGHrZcQI@cluster0.me5pggj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
  }
}
run().catch(console.dir);

const kspDB = client.db("ksp");
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
export default app;

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

var counter = 0 
var arr = []
fs.createReadStream("./Dataset.csv")
    .pipe(csv())
    .on("data", async function (data) {
        counter++;
        const doc = {
          districtName: data.DISTRICTNAME,
          unitName: data.UNITNAME,
          year: data.Year,
          accidentSpot: data.Accident_Spot,
          accidentSublocation: data.Accident_SubLocation,
          severity: data.Severity,
          roadCharacter: data.Road_Character,
          roadType: data.Road_Type,
          weather: data.Weather,
          latitude: data.Latitude,
          longitude: data.Longitude,
          month: data.Month,
          age: data.age,
          sex: data.Sex,
          personType: data.PersonType,
        };
        arr.push(doc);
        
        coll.insertOne(doc)
      
    })
    .on("end", function () {
      console.log(arr.length)
    });

    app.get("/districtCount", async (req, res) => {
      try {
        const districtNames = [
          "Bagalkot",
          "Ballari",
          "Belagavi City",
          "Belagavi Dist",
          "Bengaluru City",
          "Bengaluru Dist"
        ];
        let districtCounts = {};
        for (let district of districtNames) {
          const count = await coll.countDocuments({ districtName: district });
          districtCounts[district] = count;
        }
        res.json(districtCounts);
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "An error occurred" });
      }
    });

    app.get("/personTypeCount", async (req, res) => {
      try {
        const personTypes = [
          "Deceased",
          "Injured",
          "Unidentified Dead Body",
          "Unidentified Person",
          "Complainant",
          "Kidnapped",
          "Arrest"
        ];
        let personTypeCounts = {};
        for (let personType of personTypes) {
          const count = await coll.countDocuments({ personType: personType });
          personTypeCounts[personType] = count;
        }
        res.json(personTypeCounts);
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "An error occurred" });
      }
    });