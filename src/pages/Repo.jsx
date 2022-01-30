import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getRepositoryDetail } from "../githubAPI";

const Repo = () => {
  const { username, repo } = useParams();
  const [repos, setRepos] = useState({
    name: "",
    description: "",
    star: 0,
    url: "",
  });

  useEffect(() => {
    handleClick();
  }, []);

  const handleClick = async () => {
    try {
      const res = await getRepositoryDetail({
        username: username,
        repoName: repo,
      });
      const { name, description, star, url } = res;
      setRepos({
        name,
        description,
        star,
        url,
      });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
      <h2>
        This is {username} repo: {repo}
      </h2>
      <div>
        <div>
          <div>full_name: {repos.name}</div>
          <div>description: {repos.description}</div>
          <div>star: {repos.star}</div>
          <div>
            url:{" "}
            <a href={repos.url} target="_blank">
              link
            </a>
          </div>
        </div>
        <button onClick={handleClick}>Send</button>
      </div>
    </div>
  );
};

export default Repo;
