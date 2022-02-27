import axios from 'axios'

export const fetchRepositoryList = async (username, page, perPage) => {
  const res = await axios.request({
    method: 'Get',
    url: `https://api.github.com/users/${username}/repos`,
    params: {
      accept: 'application/vnd.github.v3+json',
      per_page: perPage,
      page: page
    }
  })
  const repos = [...res.data]
  const temp = []
  for (const repo of repos) {
    temp.push({
      name: repo.name,
      star: repo.stargazers_count
    })
  }
  return temp
}

export const fetchRepositoryDetail = async (username, repoName) => {
  const res = await axios.request({
    method: 'Get',
    url: `https://api.github.com/repos/${username}/${repoName}`,
    params: {
      accept: 'application/vnd.github.v3+json',
      owner: username,
      repo: repoName
    }
  })
  const {
    full_name: name,
    stargazers_count: star,
    html_url: url,
    language,
    description
  } = res.data
  return {
    name,
    description,
    star,
    url,
    language
  }
}

export const fetchUserInfo = async (username) => {
  const res = await axios.request({
    method: 'Get',
    url: `https://api.github.com/users/${username}`
  })
  const { name, avatar_url: avatarUrl, bio: intro, location } = res.data
  return {
    name,
    avatarUrl,
    intro,
    location
  }
}
