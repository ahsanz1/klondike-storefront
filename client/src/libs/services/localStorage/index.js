export const saveItem = (key, value) => {
  window.localStorage.setItem(key, value)
}

export const getItem = key => {
  return window.localStorage.getItem(key)
}

export const removeItem = key => {
  window.localStorage.removeItem(key)
}

export const clearLocalStorage = () => {
  window.localStorage.clear()
}
