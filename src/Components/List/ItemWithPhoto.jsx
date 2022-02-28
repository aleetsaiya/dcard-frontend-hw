import React from 'react'
import PropTypes from 'prop-types'
import './style.css'

const propTypes = {
  avatarUrl: PropTypes.string,
  message: PropTypes.string,
  small: PropTypes.string,
  onClick: PropTypes.func
}

const ItemWithPhoto = (props) => {
  const { avatarUrl, message, small, onClick } = props

  const clickAbleStyled = onClick ? { cursor: 'pointer' } : {}

  return (
    <li className="item" onClick={onClick} style={clickAbleStyled}>
      <div className="item-row">
        <div>
          <img src={avatarUrl} alt="avatar" className="item-avatar" />
        </div>
        <div>
          <div className="item-message">{message}</div>
          <div className="item-small">{small}</div>
        </div>
      </div>
    </li>
  )
}

ItemWithPhoto.propTypes = propTypes

export default ItemWithPhoto
