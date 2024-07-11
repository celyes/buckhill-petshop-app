import axios from 'axios'
import Errors from '@/utils/errors'

class Form {
  private originalData: { [key: string]: any };

  [key: string]: any

  errors: Errors

  /**
   * Create a new Form instance.
   *
   * @param {object} data
   */
  constructor(data: { [key: string]: any }) {
    this.originalData = data

    for (const field in data) {
      this[field] = data[field]
    }

    this.errors = new Errors()
  }

  /**
   * Fetch all relevant data for the form.
   */
  data(): { [key: string]: any } {
    const data: { [key: string]: any } = {}

    for (const property in this.originalData) {
      data[property] = this[property]
    }

    return data
  }

  /**
   * Reset the form fields.
   */
  reset(): void {
    for (const field in this.originalData) {
      this[field] = ''
    }

    this.errors.clear()
  }

  /**
   * Send a POST request to the given URL.
   *
   * @param {string} url
   */
  get(url: string): Promise<any> {
    return this.submit('get', url)
  }

  /**
   * Send a POST request to the given URL.
   *
   * @param {string} url
   */
  post(url: string): Promise<any> {
    return this.submit('post', url)
  }

  /**
   * Send a PUT request to the given URL.
   *
   * @param {string} url
   */
  put(url: string): Promise<any> {
    return this.submit('put', url)
  }

  /**
   * Send a PATCH request to the given URL.
   *
   * @param {string} url
   */
  patch(url: string): Promise<any> {
    return this.submit('patch', url)
  }

  /**
   * Send a DELETE request to the given URL.
   *
   * @param {string} url
   */
  delete(url: string): Promise<any> {
    return this.submit('delete', url)
  }

  /**
   * Submit the form.
   *
   * @param {string} requestType
   * @param {string} url
   */
  submit(requestType: string, url: string): Promise<any> {
    return new Promise((resolve, reject) => {
      axios({
        method: requestType,
        url: url,
        data: this.data()
      })
        .then((response) => {
          this.onSuccess(response.data)
          resolve(response.data)
        })
        .catch((error) => {
          this.onFail(error.response.data)
          reject(error.response.data)
        })
    })
  }

  /**
   * Handle a successful form submission.
   *
   * @param {object} data
   */
  onSuccess(data: any): void {
    this.reset()
  }

  /**
   * Handle a failed form submission.
   *
   * @param {object} errors
   */
  onFail(errors: { [key: string]: string[] }): void {
    this.errors.record(errors)
  }
}

export default Form
