import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import getPath from '../routeSetting'

const NotFound = () => {
  const [seconds, setSeconds] = useState(10)
  const navigate = useNavigate()

  // count down timmer
  useEffect(() => {
    if (seconds > 0) {
      const id = setTimeout(() => {
        setSeconds((seconds) => seconds - 1)
      }, 1000)
      return () => clearInterval(id)
    }
    if (seconds <= 0) {
      redirect()
    }
  }, [seconds])

  // redirect to Home page
  const redirect = () => {
    navigate(getPath('/'))
  }

  return (
    <div>
      <h2>404 page not found</h2>
      <p>Automatically redirect to Home page: {seconds}</p>
      <p>
        Redirect to Home page: <button onClick={redirect}>link</button>
      </p>
    </div>
  )
}

export default NotFound
