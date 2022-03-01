import React from 'react'
import Card from '..'
import PropTypes from 'prop-types'
import { GoLocation } from 'react-icons/go'
import { FiUser } from 'react-icons/fi'
import { AiOutlineMail } from 'react-icons/ai'

const propTypes = {
  avatarUrl: PropTypes.string,
  name: PropTypes.string,
  location: PropTypes.string,
  intro: PropTypes.string,
  socialName: PropTypes.string,
  socialLink: PropTypes.string,
  followers: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  following: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  email: PropTypes.string
}

const UserCard = (props) => {
  const {
    avatarUrl,
    name,
    location,
    intro,
    socialLink,
    socialName,
    email,
    followers,
    following
  } = props

  return (
    <Card
      title={name}
      message={intro}
      avatarUrl={avatarUrl}
      outerLink={socialLink}
      outerLinkName={socialName}
    >
      <div>
        <GoLocation className="card-small-icon" />
        {location || 'none'}
      </div>
      <div>
        <AiOutlineMail className="card-small-icon" />
        {email || 'none'}
      </div>
      <div>
        <FiUser className="card-small-icon" />
        {followers} <span>follower</span> {following} <span>following</span>
      </div>
    </Card>
  )
}

UserCard.propTypes = propTypes

export default UserCard
