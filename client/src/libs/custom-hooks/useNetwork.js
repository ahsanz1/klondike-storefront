import { useEffect, useState } from 'react'

const useNetwork = onChange => {
  const [status, setStatus] = useState(navigator.onLine)
  const handleChange = event => {
    if (typeof onChange === 'function') {
      onChange(navigator.onLine)
    }
    setStatus(navigator.onLine)
  }
  useEffect(() => {
    window.addEventListener('online', handleChange)
    window.addEventListener('offline', handleChange)
    return () => {
      window.removeEventListener('online', handleChange)
      window.removeEventListener('offline', handleChange)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return status
}

export default useNetwork

/**
 * HOW TO USE EXAMPLE
 * function App() {
    const handleNetworkChange = (online) => {
        console.log(online ? "We just went online" : "We are offline");
    };
    const onLine = useNetwork(handleNetworkChange);
    return (
        <div className="App">
            <h1>Hello</h1>
            <h1>{onLine ? "Online" : "Offline"}</h1>
        </div>
    );
}
 */
