const axios = require('axios');
const config = require('../config.js');

//the callback in this case is our save function in index.js
let getReposByUsername = (username, callback) => {

  // The options object has been provided to help you out,
  // but you'll have to fill in the URL
  const options = {
    url: `https://api.github.com/users/${username}/repos`,
    headers: {
      'User-Agent': 'request',
      'Authorization': `${config.TOKEN}`
    }
  };

  // TODO - Use the axios module to request repos for a specific
  // user from the github API
  axios.get(options.url, {headers: options.headers})
    .then((res) => {
      // console.log('We enter this');
      // console.log(res.data);
      callback(null, res.data)
    })
    .catch((err) => {
      callback(err, null)
    });

};

module.exports.getReposByUsername = getReposByUsername;