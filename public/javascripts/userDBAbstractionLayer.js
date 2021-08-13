var mongodb = require('mongodb');

var connected = false;
var db = null;
//mongodb.MongoClient.connect('mongodb://localhost:27017', { useUnifiedTopology: true }).then(connection => {
mongodb.MongoClient.connect('mongodb+srv://sxm4311:soumya123@cluster0.s89sh.mongodb.net/test?authSource=admin&replicaSet=atlas-pxhlmq-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true', { useUnifiedTopology: true }).then(connection => {
    connected = true;
    //db = connection.db('UserData');
    db = connection.db('AIHealthCareDataBase');
    console.log("DB Conection successful");
}).catch(error => {
    console.log("Error in connecting to DB");
});

async function queryUsersCollection() {
    if (connected) {

        let jsonResponse = {
            "userDetails": []
        };
 

        const usersCollectionArray = await db.collection('User').find().toArray();

        usersCollectionArray.forEach(element => {
            let userElement = {}
            userElement['username'] = element['username'];
            userElement['firstName'] = element['firstName'];
            userElement['lastName'] = element['lastName'];
            userElement['password'] = element['password'];
            jsonResponse.userDetails.push(userElement);

        });

        return jsonResponse;

    } else {
        return null;
    }
}

 function saveUserCollection(userDetail) {
    console.log(" inside saveUserCollection ###");
    if (connected) {
        
        const result =  db.collection('User').insertOne(userDetail);
        console.log(result.insertedCount+" userDetail inserted");
        return result;
        } else {
        return null;
    }
}

 function queryAuthenticateUserCollection(userDetail) {
    console.log(" inside queryAuthenticateUserCollection ###");
    if (connected) {

        let jsonResponse = {
            "userDetails": []
        };
 
        console.log("userDetail username ### "+userDetail.username);
        
        const usersCollectionArray =  db.collection('User').findOne({ username: userDetail.username, password: userDetail.password});
        //db.collection("User").find({}, { projection: { username: "abc123", password: "abc123"}});
        //db.collection('User').find().toArray();
        
        console.log(" iqueryAuthenticateUserCollection ###"+usersCollectionArray);
        

        return usersCollectionArray;

    } else {
        return null;
    }
}


function queryUsernameCollection(userDetail) {
    console.log(" inside queryUsernameCollection ###");
    if (connected) {

        let jsonResponse = {
            "userDetails": []
        };
 
        console.log("userDetail username ### ");
        
        const usersCollectionArray =  db.collection('User').findOne({ username: "abc123", password: "abc123"});
        //db.collection("User").find({}, { projection: { username: "abc123", password: "abc123"}});
        //db.collection('User').find().toArray();
        
        console.log(" inside usersCollectionArray ###"+usersCollectionArray);
        

        return usersCollectionArray;

    } else {
        return null;
    }
}

module.exports = { queryUsersCollection ,saveUserCollection,queryAuthenticateUserCollection,queryUsernameCollection};