import React from 'react'
import PropTypes from 'prop-types'
import './style.css'

const propTypes = {
  show: PropTypes.bool
}

const Loader = (props) => {
  const { show } = props

  const displayStyled = show ? {} : { display: 'none' }

  return <div className="loader" style={displayStyled}></div>
}

Loader.propTypes = propTypes

export default React.memo(Loader)
