import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { ListGroup, ListGroupItem } from 'react-bootstrap'
import { useNavigate } from 'react-router'
import { listType } from '../globalSetting'

const List = (props) => {
  const { items, type } = props
  const navigate = useNavigate()

  const getDetail = (item) => {
    if (type === listType.reposPage) {
      return (
        <Fragment>
          <div>name: {item.message}</div>
          <div>⭐: {item.star}</div>
        </Fragment>
      )
    } else if (type === listType.homePage) {
      return (
        <Fragment>
          <div>name: {item.message}</div>
          <div>fetched number: {item.num}</div>
          <div>finish: {item.finish ? '✔' : '❌'}</div>
          <div>success: {item.failed ? '❌' : '✔'}</div>
        </Fragment>
      )
    }
  }

  const getItems = () =>
    items.map((item, index) => {
      return (
        <ListGroupItem
          key={index}
          variant={index % 2 === 0 ? 'primary' : 'light'}
          action
          onClick={() => navigate(item.link)}
        >
          {getDetail(item)}
        </ListGroupItem>
      )
    })

  return <ListGroup>{getItems()}</ListGroup>
}

List.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      message: PropTypes.string,
      link: PropTypes.string,
      star: PropTypes.number,
      num: PropTypes.number,
      finish: PropTypes.bool,
      failed: PropTypes.bool
    })
  ),
  type: PropTypes.string
}

export default List
