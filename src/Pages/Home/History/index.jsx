import React, { useState, useCallback } from 'react'
import List from '../../../Components/List/'
import ItemWithPhoto from '../../../Components/List/ItemWithPhoto'
import setRoutes from '../../../Routes/setting'
import { useNavigate } from 'react-router-dom'
import './style.css'

const getSearchHistory = () => {
  // get all items in sessionStorage
  const items = { ...sessionStorage }
  const history = []
  const navigate = useNavigate()
  for (const item in items) {
    if (item[0] === '$') {
      const name = item.substring(1)
      const cache = JSON.parse(items[item])
      history.push({
        avatarUrl: cache.info.avatarUrl,
        message: name,
        small: cache.finish ? 'Fetch all: ✅' : 'Fetch all: ❌',
        onClick: () => navigate(setRoutes(`/users/${name}/repos`))
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
    <div className="history">
      <h3 className="history-title">History</h3>
      <button
        className="history-clear"
        onClick={clearHistory}
        disabled={searchHistory.length === 0}
        style={searchHistory.length === 0 ? { display: 'none' } : {}}
      >
        Clear history
      </button>
      <List ListItem={ItemWithPhoto} items={searchHistory} />
    </div>
  )
}

export default React.memo(History)
