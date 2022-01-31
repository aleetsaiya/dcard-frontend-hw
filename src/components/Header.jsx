import React from 'react'
import PropTypes from 'prop-types'

const Header = (props) => {
  const { title } = props
  const styleCenter = {
    display: 'flex',
    justifyContent: 'center',
    alignItem: 'center'
  }
  const largeSize = {
    fontSize: '3rem'
  }
  return (
    <div style={styleCenter}>
      <h2 style={largeSize}>{title}</h2>
    </div>
  )
}

Header.propTypes = {
  title: PropTypes.string
}

export default Header
