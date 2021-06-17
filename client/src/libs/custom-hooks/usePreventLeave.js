import {} from 'react'

const usePreventLeave = () => {
  const listener = event => {
    event.preventDefault()
    event.returnValue = ''
  }
  const enablePrevent = () => window.addEventListener('beforeunload', listener)
  const disaPrevent = () => window.removeEventListener('beforeunload', listener)
  return { enablePrevent, disaPrevent }
}

export default usePreventLeave

/**
 * HOW TO USE EXAMPLE
 * function App() {
    const { enablePrevent, disaPrevent } = usePreventLeave();
    return (
        <div className="App">
            <h1>Hello</h1>
            <button onClick={enablePrevent}>Protect</button>
            <button onClick={disaPrevent}>Unprotect</button>
        </div>
    );
}
 */
