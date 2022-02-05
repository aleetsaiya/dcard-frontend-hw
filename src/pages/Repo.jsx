import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { fetchRepositoryDetail } from '../githubAPI'
import toast, { Toaster } from 'react-hot-toast'
import Layout from '../components/Layout'

const Repo = () => {
  const { username: userName, repo: repoName } = useParams()
  const [repoDetail, setRepoDetail] = useState({
    name: '',
    description: '',
    star: 0,
    url: ''
  })

  useEffect(async () => {
    const data = await getRepoDetail()
    setRepoDetail({
      name: data.name,
      description: data.description,
      star: data.star,
      url: data.url
    })
  }, [])

  const getRepoDetail = async () => {
    try {
      const res = await fetchRepositoryDetail(userName, repoName)
      handleToast(false, res.description)
      return res
    } catch (e) {
      handleToast(true)
    }
  }

  const handleToast = (failed, description) => {
    if (failed) {
      toast.error('Request Failed')
    } else if (!description) {
      toast("This repository don't have description", {
        icon: '🤨'
      })
    }
  }

  return (
    <Layout title="Repository">
      <ul>
        <li>full_name: {repoDetail.name}</li>
        <li>description: {repoDetail.description}</li>
        <li>star: {repoDetail.star}</li>
        <li>
          url:
          <a href={repoDetail.url} target="_blank" rel="noreferrer">
            link
          </a>
        </li>
      </ul>
      <Toaster position="bottom-center" reverseOrder={false} />
    </Layout>
  )
}

export default Repo
