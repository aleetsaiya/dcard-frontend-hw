import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getRepositoryList, getUserInfo } from '../githubAPI'
import toast, { Toaster } from 'react-hot-toast'
import InfiniteScroll from 'react-infinite-scroll-component'
import { getPath, listType } from '../globalSetting'
import List from '../components/List'
import Layout from '../components/Layout'
import Image from 'react-bootstrap/Image'

const Repos = () => {
  const { username } = useParams()
  const [userRepos, setUserRepos] = useState({
    repos: [],
    page: 1,
    done: false
  })
  const [userInfo, setUserInfo] = useState({})
  const perPage = 10

  // init
  useEffect(() => {
    const cache = getCache()
    loadUserInfo()
    if (cache) {
      setUserRepos({
        repos: cache.repos,
        page: cache.page,
        done: cache.done
      })
      checkDone(cache.page, cache.repos, cache.done, cache.failed)
    } else loadRepos()
  }, [])

  const loadUserInfo = async () => {
    const { name, avatarUrl, intro, location } = await getUserInfo(username)
    setUserInfo({
      name: name || username,
      avatarUrl,
      intro,
      location
    })
  }

  const getCache = () => {
    return JSON.parse(sessionStorage.getItem(`repos-${username}`))
  }

  // store repositories data into cache
  const storeIntoCache = (page, repos, done, failed) => {
    sessionStorage.setItem(
      `repos-${username}`,
      JSON.stringify({
        repos: repos,
        page: page,
        done: done,
        failed: failed
      })
    )
  }

  // update cache and state
  const updateRepos = (page, repos, done, failed) => {
    storeIntoCache(page, repos, done, failed)
    setUserRepos({
      page,
      repos,
      done
    })
  }

  // load repositories by API request
  const loadRepos = async () => {
    if (!userRepos.done) {
      console.log('fetch from remote API')
      try {
        const res = await getRepositoryList({
          username: username,
          perPage: perPage,
          page: userRepos.page
        })
        const isDone = checkDone(userRepos.page, res)
        // if haven't get all repositories
        if (isDone) {
          updateRepos(userRepos.page, [...userRepos.repos, ...res], true)
        } else if (!isDone) {
          const nextPage =
            res.length === 10
              ? parseInt(userRepos.page) + 1
              : parseInt(userRepos.page)
          updateRepos(nextPage, [...userRepos.repos, ...res], false)
        }
      } catch (e) {
        toast.error('Can not find this user in Github')
        updateRepos(-1, [], true, true)
      }
    }
  }

  // check whether all repositories are fetched
  const checkDone = (page, res, done, failed) => {
    if (failed) {
      toast.error('Can not find this user in Github')
      return true
    } else if (parseInt(page) === 1 && res.length === 0) {
      // check if the user don't have any repository
      toast("This user don't have any repository", {
        icon: '🤔'
      })
      return true
    } else if (res.length < 10 || done) {
      // check if there're no more repos
      toast.success('Get all repositories')
      return true
    }
    return false
  }

  const getReposList = () =>
    userRepos.repos.map((repo) => ({
      message: repo.name,
      link: getPath(`/users/${username}/repos/${repo.name}`),
      star: repo.star
    }))

  const loader = (
    <div style={{ textAlign: 'center', fontSize: '1rem' }}>Loading ...</div>
  )

  const UserInfo = (
    <div>
      <Image
        src={userInfo.avatarUrl}
        roundedCircle={true}
        thumbnail={true}
        style={{ width: '150px' }}
      />
      <div>User name: {userInfo.name}</div>
      <div>Intro: {userInfo.intro}</div>
      <div>Location: {userInfo.location}</div>
    </div>
  )

  return (
    <Layout title="Repository List">
      {userInfo.avatarUrl ? UserInfo : ''}
      <div>Legnth: {userRepos.repos.length}</div>
      <InfiniteScroll
        dataLength={userRepos.repos.length}
        next={loadRepos}
        hasMore={!userRepos.done}
        loader={loader}
      >
        <List items={getReposList()} type={listType.reposPage} />
      </InfiniteScroll>
      <Toaster position="bottom-center" reverseOrder={false} />
    </Layout>
  )
}

export default Repos
