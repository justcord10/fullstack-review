import React from 'react';
import RepoListItem from './RepoListItem.jsx';
//need to map through our repos prop and render each list item individually with each repon passed down
const RepoList = ({ repos }) => (
  <div>
    <h4> Repo List Component </h4>
    There are {repos.length} repos.
    <div>
      {repos.map((repo) => (
      <div><RepoListItem repo={repo} /></div>
      ))}
    </div>
  </div>
)

export default RepoList;