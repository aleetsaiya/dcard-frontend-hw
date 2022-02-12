import React, { Fragment } from 'react'
import { Container } from 'react-bootstrap'
import PropTypes from 'prop-types'
import Header from './Header'

const Layout = (props) => {
  const { title, children } = props
  return (
    <Fragment>
      <Header title={title}></Header>
      <Container>{children}</Container>
      <div style={{ height: '80px' }}></div>
    </Fragment>
  )
}

Layout.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node
}

export default Layout
