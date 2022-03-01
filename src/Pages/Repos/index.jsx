import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { fetchRepositoryDetail } from '../../Api/githubAPI'

import Layout from '../../Layouts'
import Alert from '../../Components/Alert/'
import Loader from '../../Components/Loader'

const Repos = () => {
  const { username: userName, repo: repoName } = useParams()
  const [isLoading, setIsLoading] = useState(true)
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
    setIsLoading(false)
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

  const displayStyled = repo.name === '' ? { display: 'none' } : {}

  return (
    <Layout title="Repository">
      <Loader show={isLoading} />
      <ul style={displayStyled}>
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

export default Repos
