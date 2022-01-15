class LocalCache {
  setCache(key: string, value: any, isUseLocalStorage = true) {
    if (isUseLocalStorage) {
      window.localStorage.setItem(key, JSON.stringify(value))
    } else {
      window.sessionStorage.setItem(key, JSON.stringify(value))
    }
  }

  getCache(key: string, isUseLocalStorage = true) {
    let value = null
    if (isUseLocalStorage) {
      value = window.localStorage.getItem(key)
    } else {
      value = window.sessionStorage.getItem(key)
    }
    if (value) {
      try {
        return JSON.parse(value)
      } catch (error) {
        return ""
      }
    } else {
      return ""
    }
  }

  isCacheExist(key: string, isUseLocalStorage = true): boolean {
    if (isUseLocalStorage) {
      return !!window.localStorage.getItem(key)
    } else {
      return !!window.sessionStorage.getItem(key)
    }
  }

  deleteCache(key: string, isUseLocalStorage = true) {
    if (isUseLocalStorage) {
      window.localStorage.removeItem(key)
    } else {
      window.sessionStorage.removeItem(key)
    }
  }

  clearCache(isUseLocalStorage = true) {
    if (isUseLocalStorage) {
      window.localStorage.clear()
    } else {
      window.sessionStorage.clear()
    }
  }
}

export default new LocalCache()
