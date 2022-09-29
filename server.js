// server.js
// where your node app starts

// init project
require('dotenv').config();
var express = require('express');
var app = express();

//variable to store client data
var jsonData = {
  "ipaddress": null,
  "language": null,
  "software": null
}

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// retrieving data from request and sending it back 
app.get("/api/whoami", function (req, res) {

  jsonData.ipaddress = req.headers["x-forwarded-for"];
  jsonData.language = req.headers["accept-language"];
  jsonData.software = req.headers["user-agent"];
  
  res.json(jsonData);
});



// listen for requests :)
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
