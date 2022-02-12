import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getPath, listType } from '../globalSetting'
import List from '../components/List'
import Layout from '../components/Layout'
import toast, { Toaster } from 'react-hot-toast'
import { AiOutlineArrowRight } from 'react-icons/ai'

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
      if (item[0] === '$') {
        const name = item.substring(1)
        const cache = JSON.parse(items[item])
        history.push({
          message: name,
          link: getPath(`/users/${name}/repos`),
          num: cache.repos.length,
          finish: cache.finish,
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
        toast.error(username + ' is not a valid username')
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
      <div className="hp-search">
        <div className="hp-search-title">Find user repository in github</div>
        <div className="hp-search-input">
          <input
            value={username}
            onChange={handleChanged}
            onKeyDown={checkPressEnter}
            placeholder="Enter username"
            className=""
          />
          <button className="hp-search-input-submit" onClick={submit}>
            <AiOutlineArrowRight />
          </button>
        </div>
      </div>
      <div className="hp-history">
        <div className="hp-history-info">
          <h3 className="hp-history-info-title">History</h3>
          <button
            className="hp-history-info-clear"
            onClick={clearHistory}
            disabled={searchHistory.length === 0}
          >
            Clear history
          </button>
        </div>
        <List items={searchHistory} type={listType.homePage} />
        <Toaster position="bottom-center" reverseOrder={false} />
      </div>
    </Layout>
  )
}

export default Home
