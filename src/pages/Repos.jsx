import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getUserRepository } from "../githubAPI";
import toast, { Toaster } from "react-hot-toast";

const Repos = () => {
  const { username } = useParams();
  const [repos, setRepos] = useState([]);
  const reposNumPerFetch = 10;

  // init
  useEffect(() => {
    sessionStorage.setItem("requestTimes", "0");
    const cache = getCache();
    if (cache) setRepos(cache.repos);
    else loadRepos();
  }, []);

  const getCache = () => {
    return JSON.parse(sessionStorage.getItem(`repos-${username}`));
  };

  // store request times and user's repositories into session storage
  const storeIntoCache = (requestTimes, repos) => {
    sessionStorage.setItem("requestTimes", requestTimes);
    sessionStorage.setItem(
      `repos-${username}`,
      JSON.stringify({
        repos: repos,
      })
    );
  };

  // load repositories by API request
  const loadRepos = async () => {
    const requestTimes = sessionStorage.getItem("requestTimes");
    try {
      const res = await getUserRepository({
        username: username,
        reposNumPerFetch,
        requestTimes,
      });
      // check if the user don't have any repository
      if (parseInt(requestTimes) === 0 && res.length === 0) {
        toast("This user don't have any repository", {
          icon: "🤔",
        });
      } else {
        storeIntoCache(String(parseInt(requestTimes) + 1), [...repos, ...res]);
        setRepos([...repos, ...res]);
      }
    } catch (e) {
      toast.error("Can not find this user in Github");
      console.log(e);
    }
  };

  const getReposList = () => {
    if (repos.length) {
      return repos.map((repo, index) => (
        <li key={index}>
          <div>
            <div>name: {repo.name}</div>
            <div>star: {repo.star}</div>
            <div>
              more: <Link to={`/users/${username}/${repo.name}`}>link</Link>
            </div>
          </div>
        </li>
      ));
    }
  };

  return (
    <div>
      <h2>Here is Repos page</h2>
      <div>Legnth: {repos.length}</div>
      <div>Username is: {username}</div>
      <ul>{getReposList()}</ul>
      <button onClick={loadRepos}>Get</button>
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
};

export default Repos;
