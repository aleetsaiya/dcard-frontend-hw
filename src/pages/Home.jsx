import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Home = () => {
  const [username, setUsername] = useState('')
  const navigate = useNavigate()

  const handleChanged = (e) => {
    setUsername(e.target.value)
  }

  const checkSubmit = (e) => {
    // if press enter
    if (e.keyCode === 13) navigate(`/users/${username}/repos`)
  }

  const getSearchHistory = () => {
    // get all items in sessionStorage
    const items = { ...sessionStorage }
    const history = []
    let counter = 0
    for (const item in items) {
      const [type, name] = item.split('-')
      if (type === 'repos') {
        const li = (
          <li key={counter} onClick={() => navigate(`/users/${name}/repos`)}>
            {name}
          </li>
        )
        history.push(li)
      }
      counter++
    }
    return history
  }

  return (
    <div onKeyDown={checkSubmit}>
      <h2>Home page!</h2>
      <div>Input username</div>
      <input value={username} onChange={handleChanged}></input>
      <Link to={`/users/${username}/repos`}>Submit</Link>
      <h3>Search History</h3>
      <ul>{getSearchHistory()}</ul>
    </div>
  )
}

export default Home
