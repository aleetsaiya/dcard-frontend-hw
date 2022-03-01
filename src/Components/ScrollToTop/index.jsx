import React, { useEffect, useState } from 'react'
import { AiOutlineArrowUp } from 'react-icons/ai'
import './style.css'

const ScrollToTop = () => {
  const [show, setShow] = useState(false)

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => {
      removeEventListener('scroll', handleScroll)
    }
  }, [])

  const handleScroll = () => {
    if (window.pageYOffset < 500) {
      setShow(false)
    } else {
      setShow(true)
    }
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const displayStyled = show ? {} : { display: 'none' }

  return (
    <div onClick={scrollToTop} className="scroll-to-top" style={displayStyled}>
      <button>
        <AiOutlineArrowUp />
      </button>
    </div>
  )
}

export default ScrollToTop
