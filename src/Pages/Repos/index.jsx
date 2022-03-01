import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { fetchRepositoryDetail } from '../../Api/githubAPI'

import Layout from '../../Layouts'
import Alert from '../../Components/Alert/'
import Loader from '../../Components/Loader'
import Card from '../../Components/Card'
import './style.css'

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
    try {
      const res = await getRepoDetail()
      setRepo({
        name: res.name,
        description: res.description,
        star: res.star,
        url: res.url,
        language: res.language
      })
    } finally {
      setIsLoading(false)
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

  const displayStyled = repo.name === '' ? { display: 'none' } : {}
  const displayLang = !repo.language ? { display: 'none' } : {}
  return (
    <Layout title="Repository">
      <Loader show={isLoading} />
      <div style={displayStyled}>
        <Card
          title={repo.name}
          message={
            repo.description || "[Auto] This repos don't have description."
          }
          outerLink={repo.url}
          outerLinkName="Repository"
        >
          <div className="repo-badge repo-badge-red" style={displayLang}>
            Language: {repo.language}
          </div>
          <div className="repo-badge repo-badge-yellow">Star: {repo.star}</div>
        </Card>
      </div>
      <Alert {...alert} rounded="true" />
    </Layout>
  )
}

export default Repos
