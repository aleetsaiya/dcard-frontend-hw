import React from 'react'
import PropTypes from 'prop-types'
import Header from './Header'

const Layout = (props) => {
  const { title, children } = props
  return (
    <div className="container">
      <Header title={title}></Header>
      {children}
      <div style={{ height: '50px' }}></div>
    </div>
  )
}

Layout.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node
}

export default Layout
