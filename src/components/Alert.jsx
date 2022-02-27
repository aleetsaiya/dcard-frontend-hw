import React from 'react'
import PropTypes from 'prop-types'
import { FiAlertCircle } from 'react-icons/fi'

const getBackgroundColor = (type) => {
  if (type === 'danger') return '#dc3545' // red
  if (type === 'warning') return '#ffc104' // yellow
  if (type === 'success') return '#28a745' // green
}

const getColor = (type) => {
  if (type === 'danger' || type === 'success') return '#fff'
  if (type === 'warning') return '#000'
}

const Alert = (props) => {
  const { message, show, type } = props

  const alertStyled = {
    display: show ? 'flex' : 'none',
    alignItem: 'center',
    justifyContent: 'start',
    backgroundColor: getBackgroundColor(type),
    color: getColor(type),
    padding: '.5rem 2.5rem',
    fontSize: '1.1rem',
    position: 'relative'
  }

  const iconStyled = {
    marginRight: '5px',
    position: 'absolute',
    top: '50%',
    left: '1rem',
    transform: 'translateY(-50%)'
  }

  return (
    <div style={alertStyled}>
      <FiAlertCircle style={iconStyled} />
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
