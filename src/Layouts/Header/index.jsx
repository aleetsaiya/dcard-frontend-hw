import React from 'react'
import PropTypes from 'prop-types'

const propTypes = {
  title: PropTypes.string
}

const Header = (props) => {
  const { title } = props

  const headerStyled = {
    textAlign: 'center',
    padding: '0.5rem 0',
    color: '#333'
  }

  return (
    <div style={headerStyled}>
      <h1>{title}</h1>
    </div>
  )
}

Header.propTypes = propTypes

export default React.memo(Header)
