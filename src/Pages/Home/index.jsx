import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import History from './History'
import setRoutes from '../../Routes/setting'
import Layout from '../../Layouts'
import Alert from '../../Components/Alert'
import Search from '../../Components/Search'

const Home = () => {
  const [username, setUsername] = useState('')
  const [showAlert, setShowAlert] = useState(false)
  const navigate = useNavigate()

  const validUser = (username) => {
    // invalid username condition
    if (username[0] === '-' || username[username.length - 1] === '-') {
      setShowAlert(true)
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
        setShowAlert(true)
        return false
      }
    }
    return true
  }

  const handleChanged = (e) => {
    setUsername(e.target.value)
  }

  const handleSubmit = () => {
    if (validUser(username)) navigate(setRoutes(`/users/${username}/repos`))
    else setUsername('')
  }

  const handlePressEnter = (e) => {
    // if press enter
    if (e.keyCode === 13) {
      if (validUser(username)) navigate(setRoutes(`/users/${username}/repos`))
      else setUsername('')
    }
  }

  const handleError = () => {
    if (showAlert) {
      return <Alert message="Not a valid user name" type="danger" show={true} />
    }
  }

  return (
    <Layout title="Home">
      <Search
        title="Find user in Github"
        value={username}
        onChange={handleChanged}
        onSubmit={handleSubmit}
        onPressEnter={handlePressEnter}
        placeHolder="Enter username"
        onError={handleError}
      />
      <History />
    </Layout>
  )
}

export default Home
