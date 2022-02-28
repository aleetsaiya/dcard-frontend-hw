import React from 'react'
import PropTypes from 'prop-types'

const propTypes = {
  message: PropTypes.string,
  small: PropTypes.string,
  onClick: PropTypes.func
}

const Item = (props) => {
  const { message, small, onClick } = props

  const clickAbleStyled = onClick ? { cursor: 'pointer' } : {}

  return (
    <li className="item" onClick={onClick} style={clickAbleStyled}>
      <div className="item-row">
        <div className="item-row-left">
          <div className="item-message">{message}</div>
        </div>
        <div className="item-row-right">
          <div className="item-small">{small}</div>
        </div>
      </div>
    </li>
  )
}

Item.propTypes = propTypes

export default Item
