import React from 'react'
import PropTypes from 'prop-types'
import Header from './Header'
import Main from './Main'
import Footer from './Footer'

const propTypes = {
  title: PropTypes.string,
  children: PropTypes.node
}

const Layout = (props) => {
  const { title, children } = props
  return (
    <div className="container">
      <Header title={title}></Header>
      <Main>{children}</Main>
      <Footer />
    </div>
  )
}

Layout.propTypes = propTypes

export default Layout
