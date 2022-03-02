import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { fetchRepositoryDetail } from '../../Api/githubAPI'

import Layout from '../../Layouts'
import Alert from '../../Components/Alert/'
import Loader from '../../Components/Loader'
import Card from '../../Components/Card'
import './style.css'

const readCache = (userName, reposName) => {
  const key = '$' + userName
  const repos = JSON.parse(localStorage[key]).repos
  const target = repos.find((r) => r.name === reposName)
  if (Object.keys(target).includes('fullName')) return target
}

const Repos = () => {
  const { username: userName, repo: reposName } = useParams()
  const cache = readCache(userName, reposName)
  const [isLoading, setIsLoading] = useState(!cache)
  const [repos, setRepos] = useState({
    fullName: cache ? cache.fullName : '',
    description: cache ? cache.description : '',
    star: cache ? cache.star : 0,
    url: cache ? cache.url : '',
    language: cache ? cache.language : ''
  })
  const [alert, setAlert] = useState({
    type: '',
    message: '',
    show: false
  })

  useEffect(async () => {
    if (!cache) {
      try {
        const { fullName, description, star, url, language } =
          await getReposDetail()
        const repos = {
          fullName,
          description,
          star,
          url,
          language
        }
        setRepos(repos)
        writeIntoCache(repos)
      } finally {
        setIsLoading(false)
      }
    }
  }, [])

  const getReposDetail = async () => {
    try {
      console.log('fetch repos detail')
      const res = await fetchRepositoryDetail(userName, reposName)
      return res
    } catch (e) {
      setAlert({
        type: 'danger',
        message: 'Request Failed!',
        show: true
      })
    }
  }

  const writeIntoCache = (repos) => {
    const key = '$' + userName
    const cache = JSON.parse(localStorage[key])
    const index = cache.repos.findIndex((r) => r.name === reposName)
    cache.repos[index] = { ...cache.repos[index], ...repos }
    localStorage.setItem('$' + userName, JSON.stringify(cache))
  }

  const displayStyled = repos.fullName === '' ? { display: 'none' } : {}
  const displayLang = !repos.language ? { display: 'none' } : {}
  return (
    <Layout title="Repository">
      <Loader show={isLoading} />
      {console.log('render repos-page')}
      <div style={displayStyled}>
        <Card
          title={repos.fullName}
          message={
            repos.description || "[Auto] This repos don't have description."
          }
          outerLink={repos.url}
          outerLinkName="Repository"
        >
          <div className="repo-badge repo-badge-red" style={displayLang}>
            Language: {repos.language}
          </div>
          <div className="repo-badge repo-badge-yellow">Star: {repos.star}</div>
        </Card>
      </div>
      <Alert {...alert} rounded="true" />
    </Layout>
  )
}

export default Repos
