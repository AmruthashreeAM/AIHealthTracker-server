var express = require('express');
var userDBAbstractionLayer = require('../public/javascripts/userDBAbstractionLayer');

var router = express.Router();

/* GET users listing. */
router.get('/users', function (req, res, next) {
  
  userDBAbstractionLayer.queryUsersCollection().then(response=>{
    res.json(response);
  }).catch(error=>{
    res.status(500).json({});
  });

});

/* authenticate  user by username and password */
router.post('/authenticate', function (req, res, next) {
  
  console.log("inside authenticate amrutha")
  userDBAbstractionLayer.queryAuthenticateUserCollection(req.body).then(response=>{
    res.json(response);
  }).catch(error=>{
    res.status(500).json({});
  });

});

router.post('/users', function (req, res, next) {
  
  userDBAbstractionLayer.saveUserCollection(req.body).then(response=>{
    res.json(response);
  }).catch(error=>{
    res.status(500).json({});
  });

});
/* authenticate  user by */
/*router.post('/users/authenticate/abc123', function (req, res, next) {
  
  userDBAbstractionLayer.queryUsernameCollection(req).then(response=>{
    res.json(response);
  }).catch(error=>{
    res.status(500).json({});
  });

});*/


/* POST api to save user . *///db.User.insert({"firstName":"test123","lastName":"lastName","userName":"test123","password":"test123"});



module.exports = router;
