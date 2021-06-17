/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import { useRef, useEffect } from 'react'

const useClick = onClick => {
  if (typeof onclick !== 'function') {
    return
  }
  const element = useRef()
  useEffect(() => {
    if (element.current) {
      element.current.addEventListener('click', onClick)
    }
    return () => {
      if (element.current) {
        element.current.removeEventListener('click', onClick)
      }
    }
  }, [])
  return element
}

export default useClick

/**
 * HOW TO USE EXAMPLE
 * function App() {
    const onClick = () => console.log("hello");
    const title = useClick(onClick);
    return (
        <div className="App">
            <h1 ref={title}>Hello</h1>
        </div>
    );
}
 */
