import React from 'react'
import List from './List'
import { listType } from '../globalSetting'
import PropTypes from 'prop-types'

const History = (props) => {
  const { searchHistory, clearHistory } = props

  return (
    <div className="hp-history">
      {console.log('his re-render')}
      <div className="hp-history-info">
        <h3 className="hp-history-info-title">History</h3>
        <button
          className="hp-history-info-clear"
          onClick={clearHistory}
          disabled={searchHistory.length === 0}
          style={searchHistory.length === 0 ? { display: 'none' } : {}}
        >
          Clear history
        </button>
      </div>
      <List items={searchHistory} type={listType.homePage} />
    </div>
  )
}

History.propTypes = {
  searchHistory: PropTypes.array,
  clearHistory: PropTypes.func
}

export default React.memo(History)
