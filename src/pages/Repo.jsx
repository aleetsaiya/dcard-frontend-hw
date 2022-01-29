import React from "react";
import { useParams } from "react-router-dom";

const Repo = () => {
  const { username, repo } = useParams();

  return (
    <div>
      <h2>Here is repo pages</h2>
      <div>
        username: {username} repo: {repo}
      </div>
    </div>
  );
};

export default Repo;
