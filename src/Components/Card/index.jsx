import React from 'react'
import PropTypes from 'prop-types'
import { GoLocation } from 'react-icons/go'
import './style.css'

const propTypes = {
  name: PropTypes.string,
  avatarUrl: PropTypes.string,
  intro: PropTypes.string,
  location: PropTypes.string,
  outerLink: PropTypes.string,
  outerLinkName: PropTypes.string
}

const Card = (props) => {
  const { avatarUrl, name, location, intro, outerLink, outerLinkName } = props

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
        <div className="card-name">{name}</div>
        <div className="card-intro">{intro}</div>
        <div className="card-location">
          {location ? <GoLocation className="card-location-icon" /> : ''}
          {location}
        </div>
      </div>
    </div>
  )
}

Card.propTypes = propTypes

export default React.memo(Card)
