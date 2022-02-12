import React from 'react'
import PropTypes from 'prop-types'

const Header = (props) => {
  const { title } = props
  const headerStyle = {
    marginTop: '30px',
    textAlign: 'center',
    padding: '0.5rem 0'
  }
  return (
    <div style={headerStyle}>
      <h1>{title}</h1>
    </div>
  )
}

Header.propTypes = {
  title: PropTypes.string
}

export default Header
