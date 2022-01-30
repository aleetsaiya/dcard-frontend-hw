import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getRepositoryList } from "../githubAPI";
import toast, { Toaster } from "react-hot-toast";

const Repos = () => {
  const { username } = useParams();
  const [repos, setRepos] = useState({
    repos: [],
    page: 1,
    done: false,
  });
  const navigate = useNavigate();
  const perPage = 10;

  // init
  useEffect(() => {
    const cache = getCache();
    if (cache) {
      console.log("use cache");
      const isDone = checkDone(cache.page, cache.repos, cache.done);
      // if haven't get all repositories
      if (!isDone)
        setRepos({
          repos: cache.repos,
          page: cache.page,
          done: cache.done,
        });
    } else loadRepos();
  }, []);

  const getCache = () => {
    return JSON.parse(sessionStorage.getItem(`repos-${username}`));
  };

  // store next page that we should fetch and user's repositories into cache
  const storeIntoCache = (page, repos, done) => {
    sessionStorage.setItem(
      `repos-${username}`,
      JSON.stringify({
        repos: repos,
        page: page,
        done: done,
      })
    );
  };

  // load repositories by API request
  const loadRepos = async () => {
    if (!repos.done) {
      console.log("fetch from remote API");
      try {
        const res = await getRepositoryList({
          username: username,
          perPage: perPage,
          page: repos.page,
        });
        const isDone = checkDone(repos.page, res);
        // if haven't get all repositories
        if (!isDone) {
          const nextPage =
            res.length === 10 ? parseInt(repos.page) + 1 : parseInt(repos.page);
          storeIntoCache(nextPage, [...repos.repos, ...res], false);
          setRepos({
            repos: [...repos.repos, ...res],
            page: nextPage,
          });
        }
      } catch (e) {
        toast.error("Can not find this user in Github");
        console.log(e);
      }
    }
  };

  // check if all the repositories are fetched and update to the newest state
  const checkDone = (page, res, done) => {
    // check if the user don't have any repository
    if (parseInt(page) === 1 && res.length === 0) {
      toast("This user don't have any repository", {
        icon: "🤔",
      });
      setRepos({
        repos: [...repos.repos],
        page: repos.page,
        done: true,
      });
      storeIntoCache(repos.page, [...repos.repos], true);
      return true;
    }
    // check if there're no more repos
    else if (res.length < 10 || done) {
      toast.success("Get all repositories");
      setRepos({
        repos: [...repos.repos, ...res],
        page: repos.page,
        done: true,
      });
      storeIntoCache(repos.page, [...repos.repos, ...res], true);
      return true;
    }
    return false;
  };

  const getReposList = () => {
    if (repos.repos.length) {
      return repos.repos.map((repo, index) => (
        <li
          key={index}
          onClick={() => navigate(`/users/${username}/${repo.name}`)}
          style={{ background: "yellow" }}
        >
          <div>name: {repo.name}</div>
          <div>star: {repo.star}</div>
        </li>
      ));
    }
  };

  return (
    <div>
      <h2>Repos page</h2>
      <div>Legnth: {repos.repos.length}</div>
      <div>Username is: {username}</div>
      <ul>{getReposList()}</ul>
      <button onClick={loadRepos}>Get</button>
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
};

export default Repos;
