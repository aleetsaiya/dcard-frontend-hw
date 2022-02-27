import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { fetchRepositoryList, fetchUserInfo } from '../githubAPI'
import InfiniteScroll from 'react-infinite-scroll-component'
import { getPath, listType } from '../globalSetting'
import List from '../components/List'
import Layout from '../components/Layout'
import Card from '../components/Card'
import Alert from '../components/Alert'

const Repos = () => {
  const { username } = useParams()
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

  // init >> if don't have cache, send api to get user information and reposotory
  useEffect(async () => {
    if (!cache) {
      // send api to get user info
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
        message: 'Requset user information failed!',
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
          message: 'Fetch repositories failed!',
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
      link: getPath(`/users/${username}/repos/${repo.name}`),
      star: repo.star
    }))

  const loader = (
    <div style={{ textAlign: 'center', fontSize: '1rem' }}>Loading ...</div>
  )

  const haveThisUser = () => (user.info.avatarUrl ? {} : { display: 'none' })

  const loadMoreRepos = async () => {
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

  return (
    <Layout title="Repository List">
      {console.log('render list')}
      <div className="reps-info" style={haveThisUser()}>
        <Card
          avatarUrl={user.info.avatarUrl}
          name={user.info.name}
          location={user.info.location}
          intro={user.info.intro}
          githubUrl={'https://github.com/' + username.trim()}
        />
      </div>
      <div className="reps-list" style={haveThisUser()}>
        <Alert {...alert} />
        <InfiniteScroll
          dataLength={user.repos.length}
          next={loadMoreRepos}
          hasMore={!user.finish}
          loader={loader}
        >
          <List items={mapReposToList()} type={listType.reposPage} />
        </InfiniteScroll>
      </div>
    </Layout>
  )
}

export default Repos
