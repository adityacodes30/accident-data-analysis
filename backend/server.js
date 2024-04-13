import express from "express";
import * as dotenv from "dotenv"; //
dotenv.config(); //
const app = express();
app.use(express.json());

import fs from "fs";
import csv from "csv-parser";

///mongo connection

import { MongoClient, ServerApiVersion } from "mongodb";
import { log } from "console";
const uri =
  "mongodb+srv://adityaework:t9oA9XrMtGHrZcQI@cluster0.me5pggj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

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

  // to add database implementation here

  try {
  } catch {}
});

app.get("/dataDashboard", (req, res) => {});

var arr = [];

var counter = 0;


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


export default app;
