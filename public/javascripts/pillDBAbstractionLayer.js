var mongodb = require('mongodb');

var connected = false;
var db = null;
//mongodb.MongoClient.connect('mongodb://localhost:27017', { useUnifiedTopology: true }).then(connection => {
mongodb.MongoClient.connect('mongodb+srv://sxm4311:soumya123@cluster0.s89sh.mongodb.net/test?authSource=admin&replicaSet=atlas-pxhlmq-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true', { useUnifiedTopology: true }).then(connection => {
    connected = true;
    //db = connection.db('UserData');
    db = connection.db('AIHealthCareDataBase');
    console.log("DB Conection successful AIHealthCareDataBase-PillData");
}).catch(error => {
    console.log("Error in connecting to DB");
});

async function queryPillDataAllUsersCollection() {
    if (connected) {

        let jsonResponse = {
            "pill": []
        };

        const tempCollectionArray = await db.collection('PillData').find().toArray();

        tempCollectionArray.forEach(element => {
            let pillElement = {}
            pillElement['patientName'] = element['patientName'];
            pillElement['PillTaken'] = element['PillTaken'];
            pillElement['PillTakenDateTime'] = element['PillTakenDateTime'];
            jsonResponse.pill.push(pillElement);

        });

        return jsonResponse;

    } else {
        return null;
    }
}

async function queryPillDataByUsernameCollection(username) {
    if (connected) {

        let jsonResponse = {
            "pill": []
        };

        const tempUserCollectionArray = await db.collection('PillData').find({ patientName: username}).sort({PillTakenDateTime:-1}).toArray();

        tempUserCollectionArray.forEach(element => {
            let pillElement = {}
            pillElement['patientName'] = element['patientName'];
            pillElement['PillTaken'] = element['PillTaken'];
            pillElement['PillTakenDateTime'] = element['PillTakenDateTime'];
            jsonResponse.pill.push(pillElement);

        });

        return jsonResponse;

    } else {
        return null;
    }
}

async function updatePillCollection(username,pillDetails) {
    if (connected) {
        pillDetails.PillTaken = "YES"
        pillDetails.PillTakenDateTime = new Date(pillDetails.PillTakenDateTime);
        pillDetails.patientName = username;
        const result =  await db.collection('PillData').insertOne(pillDetails);
        console.log(result.insertedCount+" pillDetails inserted");
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

module.exports = { queryPillDataAllUsersCollection, queryPillDataByUsernameCollection, updatePillCollection };

