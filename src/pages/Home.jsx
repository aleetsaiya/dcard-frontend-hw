import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { getPath, listType } from '../globalSetting'
import List from '../components/List'

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

  const checkSubmit = (e) => {
    // if press enter
    if (e.keyCode === 13) navigate(getPath(`/users/${username}/repos`))
  }

  const getSearchHistory = () => {
    // get all items in sessionStorage
    console.log('get history from cache')
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

  return (
    <div onKeyDown={checkSubmit}>
      <h2>Home page!</h2>
      <div>Input username</div>
      <input value={username} onChange={handleChanged}></input>
      <Link to={getPath(`/users/${username}/repos`)}>Submit</Link>
      <h3>History</h3>
      <List items={searchHistory} type={listType.homePage} />
    </div>
  )
}

export default Home
