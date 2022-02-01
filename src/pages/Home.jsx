import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getPath, listType } from '../globalSetting'
import List from '../components/List'
import Layout from '../components/Layout'
import { Button } from 'react-bootstrap'
import toast, { Toaster } from 'react-hot-toast'

const Home = () => {
  const [username, setUsername] = useState('')
  const [searchHistory, setSearchHistory] = useState([])
  const navigate = useNavigate()

  // init
  useEffect(() => {
    setSearchHistory(getSearchHistory())
  }, [])

  const getSearchHistory = () => {
    // get all items in sessionStorage
    const items = { ...sessionStorage }
    const history = []
    for (const item in items) {
      const [type, name] = item.split('-')
      if (type === 'repos') {
        const cache = JSON.parse(items[item])
        history.push({
          message: name,
          link: getPath(`/users/${name}/repos`),
          num: cache.repos.length,
          done: cache.done,
          failed: cache.failed,
          timestamp: cache.timestamp
        })
      }
    }
    return history
  }

  const isValidUser = (username) => {
    if (username[0] === '-' || username[username.length - 1] === '-') {
      toast.error(username + 'is not a valid username')
      return false
    }
    for (const c of username) {
      if (
        !(
          (c >= 'a' && c <= 'z') ||
          (c >= 'A' && c <= 'Z') ||
          (c >= '0' && c <= '9') ||
          c === '-'
        )
      ) {
        toast.error(`"${username}" is not a valid username`)
        return false
      }
    }
    return true
  }

  const handleChanged = (e) => {
    setUsername(e.target.value)
  }

  const submit = () => {
    if (isValidUser(username)) navigate(getPath(`/users/${username}/repos`))
  }

  const checkPressEnter = (e) => {
    // if press enter
    if (e.keyCode === 13 && isValidUser(username)) {
      navigate(getPath(`/users/${username}/repos`))
    }
  }

  const clearHistory = () => {
    sessionStorage.clear()
    setSearchHistory([])
  }

  return (
    <Layout title="Home">
      <div>Input username</div>
      <input
        value={username}
        onChange={handleChanged}
        onKeyDown={checkPressEnter}
      />
      <Button size="sm" onClick={submit}>
        Submit
      </Button>
      <Button
        variant="warning"
        size="sm"
        onClick={clearHistory}
        disabled={searchHistory.length === 0}
      >
        Clear History
      </Button>
      <h3>History</h3>
      <List items={searchHistory} type={listType.homePage} />
      <Toaster position="bottom-center" reverseOrder={false} />
    </Layout>
  )
}

export default Home
