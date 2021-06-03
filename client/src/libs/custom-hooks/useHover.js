/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import { useRef, useEffect } from 'react'

const useHover = onHover => {
  if (typeof onHover !== 'function') {
    return
  }
  const element = useRef()
  useEffect(() => {
    if (element.current) {
      element.current.addEventListener('mouseenter', onHover)
    }
    return () => {
      if (element.current) {
        element.current.removeEventListener('mouseenter', onHover)
      }
    }
  }, [])
  return element
}

export default useHover

/**
 * HOW TO USE EXAMPLE
 * function App() {
    const onHover = () => console.log("hello");
    const title = useHover(onHover);
    return (
        <div className="App">
            <h1 ref={title}>Hello</h1>
        </div>
    );
}
 */
