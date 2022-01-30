import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getRepositoryList } from '../githubAPI'
import toast, { Toaster } from 'react-hot-toast'
import InfiniteScroll from 'react-infinite-scroll-component'
import getPath from '../routeSetting'

const Repos = () => {
  const { username } = useParams()
  const [repos, setRepos] = useState({
    repos: [],
    page: 1,
    done: false
  })
  const navigate = useNavigate()
  const perPage = 10

  // init
  useEffect(() => {
    const cache = getCache()
    if (cache) {
      setRepos({
        repos: cache.repos,
        page: cache.page,
        done: cache.done
      })
      checkDone(cache.page, cache.repos, cache.done)
    } else loadRepos()
  }, [])

  const getCache = () => {
    return JSON.parse(sessionStorage.getItem(`repos-${username}`))
  }

  // store repositories data into cache
  const storeIntoCache = (page, repos, done) => {
    sessionStorage.setItem(
      `repos-${username}`,
      JSON.stringify({
        repos: repos,
        page: page,
        done: done
      })
    )
  }

  // update to cache and state
  const updateRepos = (page, repos, done) => {
    storeIntoCache(page, repos, done)
    setRepos({
      repos,
      page,
      done
    })
  }

  // load repositories by API request
  const loadRepos = async () => {
    if (!repos.done) {
      console.log('fetch from remote API')
      try {
        const res = await getRepositoryList({
          username: username,
          perPage: perPage,
          page: repos.page
        })
        const isDone = checkDone(repos.page, res)
        // if haven't get all repositories
        if (isDone) {
          updateRepos(repos.page, [...repos.repos, ...res], true)
        } else if (!isDone) {
          const nextPage =
            res.length === 10 ? parseInt(repos.page) + 1 : parseInt(repos.page)
          updateRepos(nextPage, [...repos.repos, ...res], false)
        }
      } catch (e) {
        toast.error('Can not find this user in Github')
        console.log(e)
      }
    }
  }

  // check whether all repositories are fetched
  const checkDone = (page, res, done) => {
    if (parseInt(page) === 1 && res.length === 0) {
      // check if the user don't have any repository
      toast("This user don't have any repository", {
        icon: '🤔'
      })
      return true
    } else if (res.length < 10 || done) {
      // check if there're no more repos
      if (done) toast.success('Get all repositories from cache')
      else toast.success('Get all repositories')
      return true
    }
    return false
  }

  const getReposList = () => {
    if (repos.repos.length) {
      return repos.repos.map((repo, index) => (
        <li
          key={index}
          onClick={() =>
            navigate(getPath(`/users/${username}/repos/${repo.name}`))
          }
          style={{ background: 'yellow' }}
        >
          <div>name: {repo.name}</div>
          <div>star: {repo.star}</div>
        </li>
      ))
    }
  }

  return (
    <div>
      <h2>Repos page</h2>
      <div>Legnth: {repos.repos.length}</div>
      <div>Username is: {username}</div>
      <InfiniteScroll
        dataLength={repos.repos.length}
        next={loadRepos}
        hasMore={!repos.done}
        loader={<h4>Loading ...</h4>}
      >
        <ul>{getReposList()}</ul>
      </InfiniteScroll>
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  )
}

export default Repos
