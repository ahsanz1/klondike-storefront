import { useState } from 'react'
const useTabs = (initialTab, allTabs) => {
  const [currentIndex, setCurrentIndex] = useState(initialTab)
  if (!allTabs || !Array.isArray(allTabs)) {
    return
  }
  return {
    currnetItem: allTabs[currentIndex],
    changeItem: setCurrentIndex,
  }
}

export default useTabs

/**
 * HOW TO USE EXAMPLE

const content = [
    {
        tab: "Section 1",
        content: "I'm the content of the Section 1"
    },
    {
        tab: "Section 2",
        content: "I'm the content of the Section 2"
    }
];

function App() {
    const { currnetItem, changeItem } = useTabs(0, content);
    return (
        <div className="App">
            <h1>Hello</h1>
            {content.map((section, index) => (
                <button key={index} onClick={() => changeItem(index)}>
                    {section.tab}
                </button>
            ))}
            <div>{currnetItem.content}</div>
        </div>
    );
}
 */
