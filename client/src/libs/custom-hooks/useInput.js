import { useState } from 'react'

const useInput = (initialValue, validator) => {
  const [value, setValue] = useState(initialValue)
  const onChange = event => {
    const {
      target: { value },
    } = event
    let willUpdate = true
    if (typeof validator === 'function') {
      willUpdate = validator(value)
    }
    if (willUpdate) {
      setValue(value)
    }
  }
  return { value, onChange }
}

export default useInput

/**
 * HOW TO USE EXAMPLE
 * function App() {
    const maxLen = (value) => value.length < 10;
    const name = useInput("your name", maxLen);
    return (
    <div className="App">
        <h1>Hello</h1>
          <input placeholder="Name" {...name} />
    </div>
  );
}
 */
