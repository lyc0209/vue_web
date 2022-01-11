class LocalCache {
  setCache(key: string, value: any, isUseLocalStorage = true) {
    if (isUseLocalStorage) {
      window.localStorage.setItem(key, JSON.stringify(value))
    }
  }

  getCache(key: string) {
    const value = window.localStorage.getItem(key)
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

  isCacheExist(key: string): boolean {
    if (window.localStorage.getItem(key)) {
      return true
    } else {
      return false
    }
  }

  deleteCache(key: string) {
    window.localStorage.removeItem(key)
  }

  clearCache() {
    window.localStorage.clear()
  }
}

export default new LocalCache()
