import axios from "axios";

export const getUserRepository = async (data) => {
  const { reposNumPerFetch, requestTimes, username } = data;
  try {
    const res = await axios.request({
      method: "Get",
      url: `https://api.github.com/users/${username}/repos`,
      params: {
        accept: "application/vnd.github.v3+json",
        per_page: reposNumPerFetch,
        page: requestTimes,
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
