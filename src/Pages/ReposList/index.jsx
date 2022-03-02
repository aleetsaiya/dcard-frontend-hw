import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import setRoutes from '../../Routes/setting'

import Layout from '../../Layouts'
import List from '../../Components/List/'
import Item from '../../Components/List/Item'
import UserCard from '../../Components/Card/UserCard/'
import Alert from '../../Components/Alert/'
import Loader from '../../Components/Loader'
import './style.css'

import InfiniteScroll from 'react-infinite-scroll-component'
import { fetchRepositoryList, fetchUserInfo } from '../../Api/githubAPI'

const ReposList = () => {
  const { username } = useParams()
  const navigate = useNavigate()
  const cache = JSON.parse(localStorage.getItem(`$${username}`))
  const [user, setUser] = useState({
    info: {
      name: cache ? cache.info.name : '',
      avatarUrl: cache ? cache.info.avatarUrl : '',
      intro: cache ? cache.info.intro : '',
      location: cache ? cache.info.location : '',
      email: cache ? cache.info.email : '',
      followers: cache ? cache.info.followers : '',
      following: cache ? cache.info.following : ''
    },
    repos: cache ? cache.repos : [],
    page: cache ? cache.page : 0,
    finish: cache ? cache.finish : false
  })
  const [alert, setAlert] = useState({
    message: cache ? cache.alert.message : '',
    type: cache ? cache.alert.type : '',
    show: cache ? cache.alert.show : false
  })
  const [isLoading, setIsLoading] = useState(!cache)

  // init >> if don't have cache, send api to get user information and reposotory
  useEffect(async () => {
    if (!cache) {
      try {
        // send api to get user info
        const info = await getUserInfo()
        let repos = await getReposList()

        repos = [...user.repos, ...repos]
        const finish = repos.length < 10
        const page = user.page + 1
        let newAlert = { ...alert }
        if (repos.length === 0) {
          newAlert = {
            type: 'warning',
            message: "This user don't have any repository",
            show: true
          }
          setAlert(newAlert)
        } else if (finish) {
          newAlert = {
            type: 'success',
            message: 'Get all repositories!',
            show: true
          }
          setAlert(newAlert)
        }
        const temp = {
          info,
          repos,
          page,
          finish,
          alert: newAlert
        }
        setUser(temp)
        writeIntoCache(temp)
      } finally {
        setIsLoading(false)
      }
    }
  }, [])

  const getUserInfo = async () => {
    try {
      console.log('fetch remote user info')
      const res = await fetchUserInfo(username)
      return res
    } catch (e) {
      setAlert({
        type: 'danger',
        message: 'Requset failed!',
        show: true
      })
    }
  }

  const getReposList = async () => {
    if (!user.finish) {
      try {
        console.log('fetch remote repos')
        const perPage = 10
        const res = await fetchRepositoryList(username, user.page + 1, perPage)
        return res
      } catch (e) {
        setAlert({
          type: 'danger',
          message: 'Request failed!',
          show: true
        })
      }
    }
  }

  const writeIntoCache = (user) => {
    localStorage.setItem(`$${username}`, JSON.stringify(user))
  }

  const getMoreRepos = async () => {
    const res = await getReposList()
    if (res) {
      const repos = [...user.repos, ...res]
      const finish = res.length < 10
      const page = user.page + 1
      let newAlert = { ...alert }
      if (finish) {
        newAlert = {
          type: 'success',
          message: 'Get all repositories!',
          show: true
        }
        setAlert(newAlert)
      }
      const temp = {
        info: user.info,
        repos,
        page,
        finish,
        alert: newAlert
      }
      setUser(temp)
      writeIntoCache(temp)
    }
  }

  const mapReposToList = () =>
    user.repos.map((repo) => ({
      message: repo.name,
      small: '⭐' + repo.star,
      onClick: () =>
        navigate(setRoutes(`/users/${username}/repos/${repo.name}`))
    }))

  const userIntro = !user.info.intro
    ? "[Auto] This user don't have personal introduce."
    : user.info.intro

  const loadingText = (
    <div style={{ textAlign: 'center', fontSize: '1rem' }}>Loading ...</div>
  )

  const displayCard = user.info.name === '' ? { display: 'none' } : {}
  const displayList = user.repos.length === 0 ? { display: 'none' } : {}

  return (
    <Layout title="Repository List">
      <Loader show={isLoading} />
      {console.log('render repos-list page')}
      <div style={displayCard} className="reps-card">
        <UserCard
          avatarUrl={user.info.avatarUrl}
          name={user.info.name}
          intro={userIntro}
          location={user.info.location}
          socialName="Github"
          socialLink={'https://github.com/' + username.trim()}
          followers={user.info.followers}
          following={user.info.following}
          email={user.info.email}
        />
      </div>
      <div className="reps-list" style={displayList}>
        <InfiniteScroll
          dataLength={user.repos.length}
          next={getMoreRepos}
          hasMore={!user.finish}
          loader={loadingText}
        >
          <List ListItem={Item} items={mapReposToList()} />
        </InfiniteScroll>
      </div>
      <Alert {...alert} rounded="true" />
    </Layout>
  )
}

export default ReposList
