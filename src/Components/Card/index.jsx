import React from 'react'
import PropTypes from 'prop-types'
import './style.css'

const propTypes = {
  title: PropTypes.string,
  avatarUrl: PropTypes.string,
  message: PropTypes.string,
  outerLink: PropTypes.string,
  outerLinkName: PropTypes.string,
  children: PropTypes.node
}

const Card = (props) => {
  const { avatarUrl, title, message, outerLink, outerLinkName, children } =
    props

  return (
    <div className="card">
      <div className="card-left">
        <img className="card-avatar" src={avatarUrl} />
        <a
          href={outerLink}
          target="_blank"
          rel="noreferrer"
          className="card-outerlink"
        >
          <button>Goto {outerLinkName}</button>
        </a>
      </div>
      <div className="card-right">
        <div className="card-title">{title}</div>
        <div className="card-message">{message}</div>
        <div className="card-small">{children}</div>
      </div>
    </div>
  )
}

Card.propTypes = propTypes

export default React.memo(Card)
