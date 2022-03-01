import React from 'react'
import PropTypes from 'prop-types'
import { VscError, VscInfo, VscPass } from 'react-icons/vsc'

import './style.css'

const Alert = (props) => {
  const { message, show, type, rounded } = props

  const disaplyStyled = {
    display: show ? 'flex' : 'none'
  }

  const getIcon = () => {
    if (type === 'danger') return <VscError className="alert-icon" />
    if (type === 'warning') return <VscInfo className="alert-icon" />
    if (type === 'success') return <VscPass className="alert-icon" />
  }

  const className = rounded
    ? `alert alert-${type} rounded`
    : `alert alert-${type}`

  return (
    <div style={disaplyStyled} className={className}>
      {getIcon()}
      {message}
    </div>
  )
}

Alert.propTypes = {
  message: PropTypes.string,
  show: PropTypes.bool,
  type: PropTypes.string,
  rounded: PropTypes.oneOfType([PropTypes.string, PropTypes.bool])
}

export default React.memo(Alert)
