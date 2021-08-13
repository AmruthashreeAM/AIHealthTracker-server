var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
  const { spawn } = require('child_process');
  const pyProg = spawn('python', ['./AIHealthCare-Python/main.py']);
  pyProg.stdout.on('data', function(data) {

      console.log(data.toString());
      res.write(data);
      res.end('end');
  });

});

module.exports = router;
