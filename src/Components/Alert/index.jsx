import React from 'react'
import PropTypes from 'prop-types'
import { VscError, VscInfo, VscPass } from 'react-icons/vsc'

import './style.css'

const Alert = (props) => {
  const { message, show, type } = props

  const disaplyStyled = {
    display: show ? 'flex' : 'none'
  }

  const getIcon = () => {
    if (type === 'danger') return <VscError className="alert-icon" />
    if (type === 'warning') return <VscInfo className="alert-icon" />
    if (type === 'success') return <VscPass className="alert-icon" />
  }

  return (
    <div style={disaplyStyled} className={'alert alert-' + type}>
      {getIcon()}
      {message}
    </div>
  )
}

Alert.propTypes = {
  message: PropTypes.string,
  show: PropTypes.bool,
  type: PropTypes.string
}

export default React.memo(Alert)
