import React, { useState, useCallback } from 'react'
import List from './List'
import { listType, getPath } from '../globalSetting'

const getSearchHistory = () => {
  // get all items in sessionStorage
  const items = { ...sessionStorage }
  const history = []
  for (const item in items) {
    if (item[0] === '$') {
      const name = item.substring(1)
      const cache = JSON.parse(items[item])
      history.push({
        message: name,
        avatarUrl: cache.info.avatarUrl,
        link: getPath(`/users/${name}/repos`),
        finish: cache.finish
      })
    }
  }
  return history
}

const History = () => {
  const his = getSearchHistory()
  const [searchHistory, setSearchHistory] = useState(his)

  const clearHistory = useCallback(() => {
    sessionStorage.clear()
    setSearchHistory([])
  }, [])

  return (
    <div className="hp-history">
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

export default React.memo(History)
