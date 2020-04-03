// Include required modules
const jwt = require('jsonwebtoken');
const config = require('./config');
const rp = require('request-promise');
const express = require('express');
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
const port = 3020;

// Use the ApiKey and APISecret from config.js
const payload = {
    iss: config.APIKey,
    exp: ((new Date()).getTime() + 5000)
};
const token = jwt.sign(payload, config.APISecret);


// Get data using meeting id
// TODO: Swap 'test' for dynamic zoom_id
// app.get("/test", (req, res) => {

 // const zoom_id = "721905223";


// Get data using meeting id
app.get('/meeting/:id', (req, res) => {

    

  // Store the options for Zoom API which will be used to make an API call later.
  var options = {
    // This zoom endpoint displays meeting data for the given id
    uri: "https://api.zoom.us/v2/meetings/"+req.params.id, 
    auth: {
        'bearer': token
    },
    headers: {
        'User-Agent': 'Zoom-api-Jwt-Request',
        'content-type': 'application/json'
    },
    json: true
};

// Use request-promise module's .then() method to make request calls.
rp(options)
    .then(function (response) {
      // Printing the response on the console
        console.log('User has', response);
        // Console.log(typeof response);
        res.send(response);
    })
    .catch(function (err) {
        // API call failed!
        console.log('API call failed, reason ', err);
    });
});

app.listen(port, () => console.log(`Listening on port ${port}!`));