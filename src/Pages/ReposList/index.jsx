import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import setRoutes from '../../Routes/setting'

import Layout from '../../Layouts'
import List from '../../Components/List/'
import Item from '../../Components/List/Item'
import UserCard from '../../Components/UserCard/'
import Alert from '../../Components/Alert/'
import Loader from '../../Components/Loader'
import './style.css'

import InfiniteScroll from 'react-infinite-scroll-component'
import { fetchRepositoryList, fetchUserInfo } from '../../Api/githubAPI'

const ReposList = () => {
  const { username } = useParams()
  const navigate = useNavigate()
  const cache = JSON.parse(sessionStorage.getItem(`$${username}`))
  const [user, setUser] = useState({
    info: {
      name: cache ? cache.info.name : '',
      avatarUrl: cache ? cache.info.avatarUrl : '',
      intro: cache ? cache.info.intro : '',
      location: cache ? cache.info.location : ''
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
  const [isLoading, setIsLoading] = useState(false)

  // init >> if don't have cache, send api to get user information and reposotory
  useEffect(async () => {
    if (!cache) {
      // send api to get user info
      setIsLoading(true)
      const info = await getUserInfo()
      // if get info success
      if (info) {
        // get user repos
        const res = await getReposList()
        // if get repos success
        if (res) {
          const repos = [...user.repos, ...res]
          const finish = res.length < 10
          const page = user.page + 1
          let alert = {
            message: '',
            type: '',
            show: false
          }
          if (res.length === 0) {
            alert = {
              type: 'warning',
              message: "This user don't have any repository",
              show: true
            }
            setAlert(alert)
          } else if (finish) {
            alert = {
              type: 'success',
              message: 'Get all repositories!',
              show: true
            }
            setAlert(alert)
          }
          setUser({
            info,
            repos,
            page,
            finish
          })
          setCache({
            info,
            repos,
            page,
            finish,
            alert
          })
        }
      }
      setIsLoading(false)
    }
  }, [])

  const getUserInfo = async () => {
    try {
      console.log('fetch remote user info')
      const res = await fetchUserInfo(username)
      return res
    } catch (e) {
      // requset failed >> do not cache the user
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
        // fetch repositories failed
        setAlert({
          type: 'danger',
          message: 'Request failed!',
          show: true
        })
      }
    }
  }

  const setCache = (user) => {
    sessionStorage.setItem(`$${username}`, JSON.stringify(user))
  }

  const mapReposToList = () =>
    user.repos.map((repo) => ({
      message: repo.name,
      small: '⭐' + repo.star,
      onClick: () =>
        navigate(setRoutes(`/users/${username}/repos/${repo.name}`))
    }))

  const loadingText = (
    <div style={{ textAlign: 'center', fontSize: '1rem' }}>Loading ...</div>
  )

  const displayStyled = user.info.avatarUrl ? {} : { display: 'none' }

  const getMoreRepos = async () => {
    const res = await getReposList()
    if (res) {
      const repos = [...user.repos, ...res]
      const finish = res.length < 10
      const page = user.page + 1
      let alert = {
        type: '',
        message: '',
        show: false
      }
      if (finish) {
        alert = {
          type: 'success',
          message: 'Get all repositories!',
          show: true
        }
        setAlert(alert)
      }
      setUser({
        info: { ...user.info },
        repos,
        page,
        finish
      })
      setCache({
        info: { ...user.info },
        repos,
        page,
        finish,
        alert
      })
    }
  }

  const userIntro = !user.info.intro
    ? "[Auto] This user don't have personal introduce."
    : user.info.intro

  return (
    <Layout title="Repository List">
      <Loader show={isLoading} />
      <div style={displayStyled} className="reps-card">
        <UserCard
          avatarUrl={user.info.avatarUrl}
          name={user.info.name}
          location={user.info.location}
          intro={userIntro}
          outerLinkName="Github"
          outerLink={'https://github.com/' + username.trim()}
        />
      </div>
      <Alert {...alert} />
      <div className="reps-list" style={displayStyled}>
        <InfiniteScroll
          dataLength={user.repos.length}
          next={getMoreRepos}
          hasMore={!user.finish}
          loader={loadingText}
        >
          <List ListItem={Item} items={mapReposToList()} />
        </InfiniteScroll>
      </div>
    </Layout>
  )
}

export default ReposList
