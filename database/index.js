const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/fetcher', {useNewUrlParser: true, useUnifiedTopology: true});

//test connectivity
const db = mongoose.connection;
db.on('error',console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('connected to mongo database');
});

let repoSchema = new mongoose.Schema({
  id: {type: Number, unique:true},
  name: String,
  description: String,
  fullName: String,
  url: String,
  size: Number,
  forks: Number
});

let Repo = mongoose.model('Repo', repoSchema);

//this should receive an array of properly formatted objects that can just be inserted into the DB all duplicate detecting will be done in the previous function in server index
let save = (repos, callback) => {
  //need to save the entire new list to the database and invoke the callback in the err first pattern

  //need to map through the data array and for each repo, i need to:
      //check if it exists by calling save.isInDB
        //if it does then we continue to the next repo in the list
        //else we:
          //create a new Repo document
          // push the new document onto an array to be added all at once at the end
    //should be left with an array of repo documents that have not already been added
    //then just need to save that list into the database by using save.save with the reposToSave array

    console.log(data);
  // This function should save a repo or repos to
  // the MongoDB


}

//need a way to retrieve top 25 repos
let getTopRepos = () => {
}

//checks to see if a repo has been added to the DB passes true to the callback if yes and passes false if no
let isInDB = (repoID, callback) => {
  Repo.find({ id: repoID }, (err, data) => {
    if (err) {
      console.log(err);
    } else if (data === null) {
      callback(null, false);
    } else {
      callback(null, true);
    }
  })
}

module.exports.save = save;
module.exports.getTopRepos = getTopRepos;
module.exports.isInDB = isInDB;