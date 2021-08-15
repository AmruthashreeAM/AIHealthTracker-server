var mongodb = require('mongodb');

var connected = false;
var db = null;
//mongodb.MongoClient.connect('mongodb://localhost:27017', { useUnifiedTopology: true }).then(connection => {
mongodb.MongoClient.connect('mongodb+srv://sxm4311:soumya123@cluster0.s89sh.mongodb.net/test?authSource=admin&replicaSet=atlas-pxhlmq-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true', { useUnifiedTopology: true }).then(connection => {
    connected = true;
    //db = connection.db('UserData');
    db = connection.db('AIHealthCareDataBase');
    console.log("DB Conection successful AIHealthCareDataBase-TemperatureData");
}).catch(error => {
    console.log("Error in connecting to DB");
});

async function queryTemparatureAllUsersCollection() {
    if (connected) {

        let jsonResponse = {
            "temparature": []
        };

        const tempCollectionArray = await db.collection('TemparatureData').find().toArray();

        tempCollectionArray.forEach(element => {
            let tempElement = {}
            tempElement['patientName'] = element['patientName'];
            tempElement['temperatureNow'] = element['temperatureNow'];
            tempElement['temperatureSoFar'] = element['temperatureSoFar'];
            tempElement['recordedDateTime'] = element['recordedDateTime'];
            jsonResponse.temparature.push(tempElement);

        });

        return jsonResponse;

    } else {
        return null;
    }
}

async function queryTemparatureByUsernameCollection(username) {
    if (connected) {

        let jsonResponse = {
            "temparature": []
        };

        const tempUserCollectionArray = await db.collection('TemparatureData').find({ patientName: username}).sort({recordedDateTime:-1}).toArray();

        tempUserCollectionArray.forEach(element => {
            let tempElement = {}
            tempElement['patientName'] = element['patientName'];
            tempElement['temperatureNow'] = element['temperatureNow'];
            tempElement['temperatureSoFar'] = element['temperatureSoFar'];
            tempElement['recordedDateTime'] = element['recordedDateTime'];
            jsonResponse.temparature.push(tempElement);

        });

        return jsonResponse;

    } else {
        return null;
    }
}

async function updateTemparatueCollection(username,temparatureDetails) {
    if (connected) {
        temparatureDetails.recordedDateTime = new Date(temparatureDetails.recordedDateTime);
        temparatureDetails.patientName = username;
        const result =  await db.collection('TemparatureData').insertOne(temparatureDetails);
        console.log(result.insertedCount+" temparatureDetails inserted");
        return result;
        } else {
        return null;
    }
}

// async function queryRefreshTemperatureByUsernameCollection(csvData) {
//     //console.log(csvData);

    

//         // to tell mongodb to save as a date
//         csvData.forEach(obj => {
//           obj.recordedDateTime = new Date(obj.recordedDateTime);
//           console.log("obj.recordedDateTime : "+obj.recordedDateTime);
//         });
//         console.log(csvData);

//     if (connected) {

//         const result = await db.collection('TemparatureData').insertMany(csvData);
//         return result;

//     } else {
//         return null;
//     }
// }

module.exports = { queryTemparatureAllUsersCollection, queryTemparatureByUsernameCollection, updateTemparatueCollection };

