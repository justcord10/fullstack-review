const express = require('express');
const axios = require('axios');
const path = require('path'); //path is a node core module so that we can use path.join.
const github = require('../helpers/github');
const save = require('../database/index');
let app = express();

app.use(express.json()); //so that our requests are parsed properly
app.use(express.static(path.join(__dirname, '../client/dist'))); //so that our static bundled files are compiled properties. __dirname is the pathname to the directory this file lives in
// TODO - your code here!
// Set up static file service for files in the `client/dist` directory.
// Webpack is configured to generate files in that directory and
// this server must serve those files when requested.

//these are like the event handlers from the last one/////////////////////////////////////////////////////////////////

// This route should take the github username provided
// and get the repo information from the github API, then
// save the repo information in the database

app.post('/repos', function (req, res) {
  console.log('did this come through?  ', req.body); //confirmed sent through
  //res.status(200).send(req.body.username);
  github.getReposByUsername(req.body.username, (err, data) => {
    if (err) {
      res.status(400).json(err);
    } else {
    //in here i would call the Save function with another callback that sets the res.body and returns on success
      save.save(data, (data) => {
        res.status(201).json(data);
      });

    }
  });
});

app.get('/repos', function (req, res) {
  //need to acess req.body(or req.data)
  console.log('in da GET');
  res.status(200).send(['hello world']);
  // TODO - your code here!
  // This route should send back the top 25 repos
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

