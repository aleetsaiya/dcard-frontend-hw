import axios from "axios";

export const getRepositoryList = async (data) => {
  const { perPage, page, username } = data;
  console.log("In API page:", page);
  try {
    const res = await axios.request({
      method: "Get",
      url: `https://api.github.com/users/${username}/repos`,
      params: {
        accept: "application/vnd.github.v3+json",
        per_page: perPage,
        page: page,
      },
    });
    const repos = [...res.data];
    const temp = [];
    for (let repo of repos) {
      temp.push({
        name: repo.name,
        star: repo.stargazers_count,
      });
    }
    return temp;
  } catch (e) {
    throw e;
  }
};

export const getRepositoryDetail = async (data) => {
  const { username, repoName } = data;
  try {
    const res = await axios.request({
      method: "Get",
      url: `https://api.github.com/repos/${username}/${repoName}`,
      params: {
        accept: "application/vnd.github.v3+json",
        owner: username,
        repo: repoName,
      },
    });
    const { full_name, description, stargazers_count, html_url } = res.data;
    return {
      name: full_name,
      description: description,
      star: stargazers_count,
      url: html_url,
    };
  } catch (e) {
    throw e;
  }
};
