// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({
  optionSuccessStatus: 200
})); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({
    greeting: 'hello API'
  });
});

app.get('/api/timestamp', function (req, res) {
  req.Time = new Date();
  res.json({
    "unix": req.Time.getTime(),
    "utc": req.Time.toUTCString()
  });
});

app.get('/api/timestamp/:date_string?', function (req, res) {

  let date_string = req.params.date_string;
  const errObj = {
    "error": "Invalid Date"
  };

  req.utcTime = new Date(date_string);
  req.unixTime = new Date(parseInt(date_string, 10));

  // look for "date"
  var dateRegex = /^([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))$/;
  var hasDateFormat = dateRegex.test(date_string);

  // look for "number"
  var numberRegex = /^[0-9]*$/;
  var hasNumbersOnly = numberRegex.test(date_string);

  if (hasDateFormat) {
    res.json({
      "unix": req.utcTime.getTime(),
      "utc": req.utcTime.toUTCString()
    });
  } else if (hasNumbersOnly) {
    res.json({
      "unix": req.unixTime.getTime(),
      "utc": req.unixTime.toUTCString()
    });
  } else {
    res.json(errObj);
  }
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});