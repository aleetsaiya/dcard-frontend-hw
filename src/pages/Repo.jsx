import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { fetchRepositoryDetail } from '../githubAPI'
import Layout from '../components/Layout'
import Alert from '../components/Alert'

const Repo = () => {
  const { username: userName, repo: repoName } = useParams()
  const [repo, setRepo] = useState({
    name: '',
    description: '',
    star: 0,
    url: '',
    language: ''
  })
  const [alert, setAlert] = useState({
    type: '',
    message: '',
    show: false
  })

  useEffect(async () => {
    const res = await getRepoDetail()
    if (res) {
      setRepo({
        name: res.name,
        description: res.description,
        star: res.star,
        url: res.url,
        language: res.language
      })
    }
  }, [])

  const getRepoDetail = async () => {
    try {
      const res = await fetchRepositoryDetail(userName, repoName)
      return res
    } catch (e) {
      setAlert({
        type: 'danger',
        message: 'Request Failed!',
        show: true
      })
    }
  }

  const displayStyled = () => (repo.name === '' ? { display: 'none' } : {})

  return (
    <Layout title="Repository">
      <ul style={displayStyled()}>
        <li>full_name: {repo.name}</li>
        <li>description: {repo.description}</li>
        <li>star: {repo.star}</li>
        <li>
          url:
          <a href={repo.url} target="_blank" rel="noreferrer">
            link
          </a>
        </li>
        <li>language: {repo.language}</li>
      </ul>
      <Alert {...alert} />
    </Layout>
  )
}

export default Repo
