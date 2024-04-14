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