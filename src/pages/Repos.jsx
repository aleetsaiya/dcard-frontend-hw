import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getRepositoryList } from '../githubAPI'
import toast, { Toaster } from 'react-hot-toast'
import InfiniteScroll from 'react-infinite-scroll-component'
import { getPath, listType } from '../globalSetting'
import List from '../components/List'
import Layout from '../components/Layout'

const Repos = () => {
  const { username } = useParams()
  const [repos, setRepos] = useState({
    repos: [],
    page: 1,
    done: false
  })
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
      checkDone(cache.page, cache.repos, cache.done, cache.failed)
    } else loadRepos()
  }, [])

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
    setRepos({
      page,
      repos,
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
        updateRepos(-1, [], true, true)
        console.log(e)
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
      if (done) toast.success('Get all repositories from cache')
      else toast.success('Get all repositories')
      return true
    }
    return false
  }

  const getReposList = () =>
    repos.repos.map((repo) => ({
      message: repo.name,
      link: getPath(`/users/${username}/repos/${repo.name}`),
      star: repo.star
    }))

  return (
    <Layout title="Repository List">
      <div>Legnth: {repos.repos.length}</div>
      <div>Username is: {username}</div>
      <InfiniteScroll
        dataLength={repos.repos.length}
        next={loadRepos}
        hasMore={!repos.done}
        loader={
          <div style={{ textAlign: 'center', fontSize: '1rem' }}>
            Loading ...
          </div>
        }
      >
        <List items={getReposList()} type={listType.reposPage} />
      </InfiniteScroll>
      <Toaster position="bottom-center" reverseOrder={false} />
    </Layout>
  )
}

export default Repos
