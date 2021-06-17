/* eslint-disable no-new */
const useNotification = (title, options) => {
  if (!('Notification' in window)) {
    return
  }
  const fireNotif = () => {
    if (Notification.permission !== 'granted') {
      Notification.requestPermission().then(permission => {
        if (permission === 'granted') {
          new Notification(title, options)
        } else {
        }
      })
    } else {
      new Notification(title, options)
    }
  }
  return fireNotif
}

export default useNotification
/**
 * HOW TO USE EXAMPLE
 * function App() {
    const triggerNotif = useNotification("Can I steal your kimchi?", {
        body: "I love kimchi dont you"
    });
    return (
        <div className="App">
            <h1>Hello</h1>
            <button onClick={triggerNotif}>Hello</button>
        </div>
    );
}
 */
