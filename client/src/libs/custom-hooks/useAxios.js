import { useEffect, useState } from 'react'

// eslint-disable-next-line no-undef
const useAxios = (options, axiosInstance = defaultAxios) => {
  const [state, setSate] = useState({
    loading: true,
    error: null,
    data: null,
  })
  const [trigger, setTrigger] = useState(0)
  if (!options.url) {
    return
  }
  const refetch = () => {
    setSate({
      ...state,
      loading: true,
    })
    setTrigger(Date.now())
  }
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    axiosInstance(options)
      .then(data => {
        setSate({
          ...state,
          loading: false,
          data,
        })
      })
      .catch(error => {
        setSate({
          ...state,
          loading: false,
          error,
        })
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trigger])
  return { ...state, refetch }
}

export default useAxios

/**
 * HOW TO USE EXAMPLE
 * function App() {
    const { loading, data, refetch } = useAxios({
        url:
            "https://cors-anywhere.herokuapp.com/https://yts.am/api/v2/list_movies.json"
    });
    console.log(loading, data, JSON.stringify(data), refetch);
    return (
        <div className="App">
            <h1>{data && data.status}</h1>
            <h1>{loading && "Loading"}</h1>
            <button onClick={refetch}>Refetch</button>
        </div>
    );
}
 */
