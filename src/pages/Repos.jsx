import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { fetchRepositoryList, fetchUserInfo } from '../githubAPI'
import toast, { Toaster } from 'react-hot-toast'
import InfiniteScroll from 'react-infinite-scroll-component'
import { getPath, listType } from '../globalSetting'
import List from '../components/List'
import Layout from '../components/Layout'
import Image from 'react-bootstrap/Image'

const Repos = () => {
  const { username } = useParams()
  const [user, setUser] = useState({
    info: {
      name: '',
      avatarUrl: '',
      intro: '',
      location: ''
    },
    repos: [],
    page: 0,
    finish: false
  })
  const perPage = 10

  // init
  useEffect(async () => {
    const cache = getCache()
    if (cache) {
      setUser(cache)
      handleToast(cache.page, cache.finish, cache.failed)
    } else {
      const info = await getUserInfo()
      if (info) {
        const [repos, page, finish, failed] = await getReposList()
        setCacheAndState(info, repos, page, finish, failed)
      }
    }
  }, [])

  const getCache = () => {
    return JSON.parse(sessionStorage.getItem(`$${username}`))
  }

  const setCacheAndState = (info, repos, page, finish, failed) => {
    setUser({
      info: info,
      repos: [...repos],
      page: page,
      finish: finish
    })
    sessionStorage.setItem(
      `$${username}`,
      JSON.stringify({
        info: {
          name: info.name || username,
          avatarUrl: info.avatarUrl,
          intro: info.intro,
          location: info.location
        },
        repos: [...repos],
        page: page,
        finish: finish,
        failed: failed
      })
    )
  }

  const getUserInfo = async () => {
    try {
      console.log('fetch remote user info')
      const res = await fetchUserInfo(username)
      return res
    } catch (e) {
      console.log('fetch user info failed')
      handleToast(-1, true, true)
      setCacheAndState(user.info, user.repos, user.page, true, true)
    }
  }

  const getReposList = async () => {
    let { page, finish } = user
    let repos = [...user.repos]
    let failed = false
    let res

    if (!finish) {
      try {
        console.log('fetch remote repos')
        res = await fetchRepositoryList(username, page + 1, perPage)
        repos = [...repos, ...res]
        finish = checkFinish(res.length)
        page += 1
      } catch (e) {
        console.log('fetch repos failed')
        failed = true
        finish = true
        setCacheAndState(user.info, repos, page, finish, failed)
      } finally {
        handleToast(page, finish, failed, res.length)
      }
    }
    return [repos, page, finish, failed]
  }

  const checkFinish = (responseLength) => {
    if (responseLength < 10) return true
    return false
  }

  const handleToast = (page, finish, failed, responseLength) => {
    if (failed) {
      toast.error('Request Failed')
    } else if (page === 1 && responseLength === 0) {
      toast("This user don't have any repository", {
        icon: '🤔'
      })
    } else if (finish) {
      toast.success('Get all repositories')
    }
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

  const userInfo = user.info.avatarUrl
    ? (
    <div>
      <Image
        src={user.info.avatarUrl || ''}
        roundedCircle={true}
        thumbnail={true}
        style={{ width: '150px' }}
      />
      <div>User name: {user.info.name}</div>
      <div>Intro: {user.info.intro}</div>
      <div>Location: {user.info.location}</div>
    </div>
      )
    : (
        ''
      )

  return (
    <Layout title="Repository List">
      {console.log('render', user.repos)}
      {userInfo}
      <div>Legnth: {user.repos.length}</div>
      <InfiniteScroll
        dataLength={user.repos.length}
        next={async () => {
          const [repos, page, finish, failed] = await getReposList()
          setCacheAndState(user.info, repos, page, finish, failed)
        }}
        hasMore={!user.finish}
        loader={loader}
      >
        <List items={mapReposToList()} type={listType.reposPage} />
      </InfiniteScroll>
      <Toaster position="bottom-center" reverseOrder={false} />
    </Layout>
  )
}

export default Repos