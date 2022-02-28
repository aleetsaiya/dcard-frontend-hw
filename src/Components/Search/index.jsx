import React from 'react'
import PropTypes from 'prop-types'
import { AiOutlineArrowRight } from 'react-icons/ai'
import './style.css'

const propTypes = {
  title: PropTypes.string,
  value: PropTypes.string,
  submit: PropTypes.func,
  onChange: PropTypes.func,
  onKeyDown: PropTypes.func,
  onError: PropTypes.func,
  placeHolder: PropTypes.string
}

const Search = (prop) => {
  const {
    title,
    onSubmit,
    onChange,
    onPressEnter,
    onError,
    value,
    placeHolder
  } = prop

  return (
    <div className="search">
      <div className="search-title">{title}</div>
      <div className="search-out-box">
        <div className="search-search-box">
          <input
            value={value}
            onChange={onChange}
            onKeyDown={onPressEnter}
            placeholder={placeHolder}
          />
          <button onClick={onSubmit}>
            <AiOutlineArrowRight />
          </button>
        </div>
        {onError()}
      </div>
    </div>
  )
}

Search.propTypes = propTypes

export default Search
