import React from 'react'
import PropTypes from 'prop-types'
import { GoLocation } from 'react-icons/go'

const Card = (props) => {
  const { avatarUrl, name, location, intro, githubUrl } = props

  return (
    <div className="custom-card">
      <img className="custom-card-avatar" src={avatarUrl} />
      <div className="custom-card-name">{name}</div>
      <div className="custom-card-location">
        {location ? <GoLocation className="custom-card-location-icon" /> : ''}
        {location}
      </div>
      <div className="custom-card-intro">{intro}</div>
      <a href={githubUrl} target="_blank" rel="noreferrer">
        <button className="custom-card-button">Goto Github</button>
      </a>
    </div>
  )
}

Card.propTypes = {
  avatarUrl: PropTypes.string,
  name: PropTypes.string,
  location: PropTypes.string,
  intro: PropTypes.string,
  githubUrl: PropTypes.string
}

export default React.memo(Card)
