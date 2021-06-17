import { useState, useEffect } from 'react'

const useScroll = () => {
  const [status, setStatus] = useState({ x: 0, y: 0 })
  const onScroll = () => {
    setStatus({ x: window.scrollX, y: window.scrollY })
  }
  useEffect(() => {
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return status
}

export default useScroll

/**
 * HOW TO USE EXAMPLE
 * function App() {
    const { y } = useScroll();
    return (
        <div className="App" style={{ height: "1000vh" }}>
            <h1 style={{ position: "fixed", color: y > 1000 ? "blue" : "red" }}>
                Hello
        </h1>
        </div>
    );
}
 */
