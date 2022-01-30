import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getRepositoryDetail } from '../githubAPI'
import toast, { Toaster } from 'react-hot-toast'

const Repo = () => {
  const { username, repo } = useParams()
  const [repos, setRepos] = useState({
    name: '',
    description: '',
    star: 0,
    url: ''
  })

  useEffect(() => {
    loadRepoDetail()
  }, [])

  const loadRepoDetail = async () => {
    try {
      const res = await getRepositoryDetail({
        username: username,
        repoName: repo
      })
      const { name, description, star, url } = res
      if (!description) {
        toast("This repository don't have description", {
          icon: '🤔'
        })
      }
      setRepos({
        name,
        description,
        star,
        url
      })
    } catch (e) {
      toast.error('Request Failed')
    }
  }

  return (
    <div>
      <h2>
        This is {username} repo: {repo}
      </h2>
      <ul>
        <li>full_name: {repos.name}</li>
        <li>description: {repos.description}</li>
        <li>star: {repos.star}</li>
        <li>
          url:
          <a href={repos.url} target="_blank" rel="noreferrer">
            link
          </a>
        </li>
      </ul>
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  )
}

export default Repo
