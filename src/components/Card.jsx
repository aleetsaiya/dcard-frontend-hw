import React from 'react'
import { Image } from 'react-bootstrap'
import PropTypes from 'prop-types'
import { GoLocation } from 'react-icons/go'

const Card = (props) => {
  const { avatarUrl, name, location, intro, githubUrl } = props

  return (
    <div className="custom-card">
      <Image
        className="custom-card-avatar"
        src={avatarUrl}
        roundedCircle={true}
      />
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

export default Card
