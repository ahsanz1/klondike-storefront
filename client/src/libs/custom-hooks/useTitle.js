import { useState, useEffect } from 'react'

const useTitle = initialTitle => {
  const [title, setTitle] = useState(initialTitle)
  const updateTitle = () => {
    const htmlTitle = document.querySelector('title')
    htmlTitle.innerText = title
  }
  useEffect(updateTitle, [title])
  return setTitle
}

export default useTitle

/**
 * HOW TO USE EXAMPLE
 * function App() {
    const titleUpdater = useTitle("Loading...");
    setTimeout(() => titleUpdater("home"), 5000);
    return (
        <div className="App">
            <h1>Hello</h1>
        </div>
    );
}
 */
