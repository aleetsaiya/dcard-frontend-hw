import React, { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { getPath } from '../globalSetting'
import Layout from '../components/Layout'
import History from '../components/History'
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
          avatarUrl: cache.info.avatarUrl,
          link: getPath(`/users/${name}/repos`),
          finish: cache.finish
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

  const clearHistory = useCallback(() => {
    sessionStorage.clear()
    setSearchHistory([])
  }, [])

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
      <History clearHistory={clearHistory} searchHistory={searchHistory} />
      <Toaster position="bottom-center" reverseOrder={false} />
    </Layout>
  )
}

export default Home
