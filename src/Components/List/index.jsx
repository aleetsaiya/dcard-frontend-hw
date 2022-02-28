import React from 'react'
import PropTypes from 'prop-types'

const propTypes = {
  ListItem: PropTypes.func,
  items: PropTypes.array
}

const List = (props) => {
  const { ListItem, items } = props

  const mapItems = () =>
    items.map((item, index) => <ListItem key={index} {...item} />)

  return <ul className="list">{mapItems()}</ul>
}

List.propTypes = propTypes

export default List
