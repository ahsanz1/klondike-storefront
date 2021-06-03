import { useState, useEffect } from 'react'

const useGeoLocation = () => {
  const [location, setLocation] = useState()

  const updateLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(pos => {
        setLocation({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        })
      })
    }
  }

  useEffect(() => {
    updateLocation()
  }, [])

  return [location, updateLocation]
}

export default useGeoLocation

/**
 * HOW TO USE EXAMPLE
 * function App() {
    const [geoLocation, updateLocation] = useGeoLocation();
    return (
        <div className="App">
            <p>latitude: {geoLocation.lat}</p>
            <p>longitude: {geoLocation.lat}</p>
            <button
              onClick={updateLocation}
            >
              Get location
            </button>
        </div>
    );
}
*/
