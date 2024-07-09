class Storage {
  constructor(mode = 'local') {
    this.mode = mode
    this.container = window.localStorage
  }
  /**
   * gets a value or multiple values from storage by their keys
   *
   * @param keys
   * @returns {*} the value correspondent to the provided key
   */
  get(keys: object) {
    return new Promise( (resolve, reject) => {
      try {
        const item = this.container.getItem(keys)
        resolve(item)
      } catch(e) {
        reject(e)
      }
    })
  }

  /**
   * saves a value or multiple values to storage
   * @param value
   * @param {callback} callback Callback function to execute
   * @return {Promise}
   */
  set(value, callback = () => {}) {
    return new Promise((resolve, reject) => {
      this.container?.setItem(values.keys, value.value)
        .then(() => { callback() })
        .then(r => { resolve(r) })
        .catch(e => { reject(e) })
    })
  }

  /**
   * remove a key or multiple keys from storage
   *
   * @param {array} keys List of keys to remove
   * @param {callback} callback Callback function to execute
   * @return {Promise}
   */
  remove(keys, callback = () => {}) {
    return new Promise((resolve, reject) => {
      this.container.removeItem(keys)
        .then(() => { callback() })
        .then(r => { resolve(r) })
        .catch(e => { reject(e) })
    })
  }
}

export default new Storage()