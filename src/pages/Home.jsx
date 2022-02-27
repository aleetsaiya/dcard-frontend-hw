import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getPath } from '../globalSetting'
import Layout from '../components/Layout'
import History from '../components/History'
import Alert from '../components/Alert'
import { AiOutlineArrowRight } from 'react-icons/ai'

const Home = () => {
  const [username, setUsername] = useState('')
  const [showAlert, setShowAlert] = useState(false)
  const navigate = useNavigate()

  const isValidUser = (username) => {
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

  const submit = () => {
    if (isValidUser(username)) navigate(getPath(`/users/${username}/repos`))
    else setUsername('')
  }

  const checkPressEnter = (e) => {
    // if press enter
    if (e.keyCode === 13) {
      if (isValidUser(username)) navigate(getPath(`/users/${username}/repos`))
      else setUsername('')
    }
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
        <Alert
          message="Not a valid user name"
          type="danger"
          show={showAlert}
        />
      </div>
      <History />
    </Layout>
  )
}

export default Home
