import axios from 'axios'

export const getRepositoryList = async (data) => {
  const { perPage, page, username } = data
  console.log('In API page:', page)
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

export const getRepositoryDetail = async (data) => {
  const { username, repoName } = data
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
    description
  } = res.data
  return {
    name: name,
    description: description,
    star: star,
    url: url
  }
}
