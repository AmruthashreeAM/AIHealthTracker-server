var express = require('express');
var tempDBAbstractionLayer = require('../public/javascripts/temparatureDBAbstractionLayer');
const fs = require("fs");
const mongodb = require("mongodb").MongoClient;
const fastcsv = require("fast-csv");
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
  
  tempDBAbstractionLayer.queryTemparatureAllUsersCollection().then(response=>{
    res.json(response);
  }).catch(error=>{
    res.status(500).json({});
  });

});

/* GET temparature by users listing. */
router.get('/:username', function (req, res, next) {
  
  tempDBAbstractionLayer.queryTemparatureByUsernameCollection(req.params.username).then(response=>{
    res.json(response);
  }).catch(error=>{
    res.status(500).json({});
  });

});

router.post('/:username/updateTemperature', function (req, res, next) {
  
  tempDBAbstractionLayer.updateTemparatueCollection(req.params.username,req.body).then(response=>{
    res.json(response);
  }).catch(error=>{
    res.status(500).json({});
  });

});

// /* GET temparature by users listing. */
// router.get('/:username/refreshTemperature', function (req, res, next) {
//   console.log("Inside csvData");
//   let tempData = [];
//   let stream = fs.createReadStream("/Users/kranthi/Downloads/AIBasedHealthTracker/AIHealthCare-server/routes/tempData.csv");
//   console.log("after stream");
//   let csvData = [];
//   let csvStream = fastcsv
//   .parse()
//   .on("data", function(data) {
//     csvData.push({
//         patientName: data[0],
//         temperatureNow: data[1],
//         temperatureSoFar: data[2],
//         recordedDateTime: data[3]
//     });
//   })
//   .on("end", function() {
//     // remove the first line: header
//     csvData.shift();
    
//     tempDBAbstractionLayer.queryRefreshTemperatureByUsernameCollection(csvData).then(response=>{
//       res.json(response);
//     }).catch(error=>{
//       res.status(500).json({});
//     });
//   });
  
//   stream.pipe(csvStream);
//   });


module.exports = router;
