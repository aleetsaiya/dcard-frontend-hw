import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { ListGroup, ListGroupItem, Image } from 'react-bootstrap'
import { useNavigate } from 'react-router'
import { listType } from '../globalSetting'
import { AiFillStar } from 'react-icons/ai'
import { FaUser } from 'react-icons/fa'

const List = (props) => {
  const { items, type } = props
  const navigate = useNavigate()

  const getDetail = (item) => {
    if (type === listType.reposPage) {
      return (
        <Fragment>
          <div className="list-item-title">{item.message}</div>
          <div className="list-item-message">
            <AiFillStar className="list-item-message-star" />
            {item.star}
          </div>
        </Fragment>
      )
    } else if (type === listType.homePage) {
      return (
        <Fragment>
          {item.avatarUrl
            ? (
            <Image
              src={item.avatarUrl}
              roundedCircle={true}
              className="list-item-avatar"
            />
              )
            : (
            <FaUser className="list-item-avatar" />
              )}

          <div className="list-item-info">
            <div className="list-item-info-title">{item.message}</div>
            <div className="list-item-info-status">
              Fetch Finish :{' '}
              <span className="list-item-info-status-icon">
                {item.finish ? '✅' : '❌'}
              </span>
            </div>
          </div>
        </Fragment>
      )
    }
  }

  const getItems = () =>
    items.map((item, index) => {
      return (
        <ListGroupItem
          key={index}
          onClick={() => navigate(item.link)}
          className="list-item"
        >
          {getDetail(item)}
        </ListGroupItem>
      )
    })

  return <ListGroup className="list">{getItems()}</ListGroup>
}

List.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      avatarUrl: PropTypes.string,
      message: PropTypes.string,
      link: PropTypes.string,
      star: PropTypes.number,
      finish: PropTypes.bool
    })
  ),
  type: PropTypes.string
}

export default List
