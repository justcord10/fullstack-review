import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery'; //REMOVE ME PLZ
import axios from 'axios';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';

const App = () => {

  const [repos, setRepos] = useState([]);

  React.useEffect(()=>{getRepos((repos) => {setRepos(repos)});}, []);

  const getRepos = (callback) => {
    axios.get('/repos')
      .then( (res) => {
      console.log(res.data);
      callback(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const search = (term) => {
    console.log(`${term} was searched`); //being properly passed down to the search component
    //axios post request to the endpoint '/repos' axios returns a promise!!!!!!!!!!!!!!!!
    axios.post('/repos', {
      username: term
    }).then(() => {getRepos();})
  }

  return (
    <div>
      <h1>Github Fetcher</h1>
      <RepoList repos={repos}/>
      <Search onSearch={search}/>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('app'));