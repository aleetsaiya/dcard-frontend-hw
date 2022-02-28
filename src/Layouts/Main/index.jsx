import React from 'react'
import PropTypes from 'prop-types'

const propTypes = {
  children: PropTypes.node
}

const Main = (props) => {
  const { children } = props

  return <div>{children}</div>
}

Main.propTypes = propTypes

export default Main
