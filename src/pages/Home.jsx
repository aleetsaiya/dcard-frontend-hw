import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getPath, listType } from '../globalSetting'
import List from '../components/List'
import Layout from '../components/Layout'
import { Button } from 'react-bootstrap'

const Home = () => {
  const [username, setUsername] = useState('')
  const [searchHistory, setSearchHistory] = useState([])
  const navigate = useNavigate()

  // init
  useEffect(() => {
    setSearchHistory(getSearchHistory())
  }, [])

  const handleChanged = (e) => {
    setUsername(e.target.value)
  }

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

  const submit = () => {
    navigate(getPath(`/users/${username}/repos`))
  }

  const checkPressEnter = (e) => {
    // if press enter
    if (e.keyCode === 13) navigate(getPath(`/users/${username}/repos`))
  }

  const clearHistory = () => {
    sessionStorage.clear()
    console.log(sessionStorage)
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
      <Button size="sm" onClick={() => submit}>
        Submit
      </Button>
      <Button variant="warning" size="sm" onClick={clearHistory}>
        Clear History
      </Button>
      <h3>History</h3>
      <List items={searchHistory} type={listType.homePage} />
    </Layout>
  )
}

export default Home
