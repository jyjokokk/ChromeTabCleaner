import React, { useEffect, useState } from 'react';
import Button from './components/Button'

type Tab = chrome.tabs.Tab

const App = (): JSX.Element => {
  const [ tabs, setTabs ] = useState<Tab[]>([])

  useEffect(() => {
    chrome.tabs.query({ })
      .then((resp) => {
        setTabs(resp)
      })
  }, [])

  const closeDuplicates = () => {
    const tabList: Tab[] = [...tabs]
    const seen = new Set();
    const toClose: number[] = []
    for (let tab of tabList) {
      if (tab.id !== undefined && seen.has(tab.url)) {
        toClose.push(tab.id)
        continue
      }
      seen.add(tab.url)
    }
    chrome.tabs.remove(toClose)
    setTabs([...new Set(tabList)])
  }

  const sortTabs = async () => {
    const sorted = [...tabs]
    sorted.sort((a, b) => {
      return (a.url > b.url) ? 1
           : (b.url > a.url) ? -1
           : 0 }
      )
    for (let i = 0; i < sorted.length; i++) {
      sorted[i].index = i;
      await chrome.tabs.move(sorted[i].id, {"index": i})
      alert(sorted[i].index)
    }
    setTabs(sorted);
  }

  return (
    <div className="App">
      <Button text="Close duplicates" handleClick={closeDuplicates} />
      <Button text="Sort tabs" handleClick={sortTabs} />
    </div>
  );
}

export default App;
