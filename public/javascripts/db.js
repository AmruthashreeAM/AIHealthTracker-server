const fs = require("fs");
const mongodb = require("mongodb").MongoClient;
const fastcsv = require("fast-csv");

// let url = "mongodb://username:password@localhost:27017/";
//mongodb.MongoClient.connect('mongodb+srv://sxm4311:soumya123@cluster0.s89sh.mongodb.net/test?authSource=admin&replicaSet=atlas-pxhlmq-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true', { useUnifiedTopology: true }).then(connection => {
let url = "mongodb+srv://sxm4311:soumya123@cluster0.s89sh.mongodb.net/test?authSource=admin&replicaSet=atlas-pxhlmq-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true";
//let url = "mongodb://localhost:27017/";
let stream = fs.createReadStream("tempData.csv");
let csvData = [];
let csvStream = fastcsv
  .parse()
  .on("data", function(data) {
    csvData.push({
        patientName: data[0],
        temperatureNow: data[1],
        temperatureSoFar: data[2],
        recordedDateTime: data[3]
    });
  })
  .on("end", function() {
    // remove the first line: header
    csvData.shift();

    console.log(csvData);

    mongodb.connect(
      url,
      { useNewUrlParser: true, useUnifiedTopology: true },
      (err, client) => {
        if (err) throw err;

        client
          .db("AIHealthCareDataBase")
          .collection("TemparatureData")
          .insertMany(csvData, (err, res) => {
            if (err) throw err;

            console.log(`Inserted: ${res.insertedCount} rows`);
            client.close();
          });
      }
    );
  });

stream.pipe(csvStream);