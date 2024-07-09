class Errors {
  private errors: { [key: string]: string[] } = {};

  /**
   * Create a new Errors instance.
   */
  constructor() {}

  /**
   * Determine if an error exists for the given field.
   *
   * @param {string} field
   * @returns {boolean}
   */
  has(field: string): boolean {
    return this.errors.hasOwnProperty(field);
  }

  /**
   * Determine if we have any errors.
   *
   * @returns {boolean}
   */
  any(): boolean {
    return Object.keys(this.errors).length > 0;
  }

  /**
   * Retrieve the error message for a field.
   *
   * @param {string} field
   * @returns {string | undefined}
   */
  get(field: string): string | undefined {
    if (this.errors[field]) {
      return this.errors[field][0];
    }
  }

  /**
   * Record the new errors.
   *
   * @param {object} errors
   */
  record(errors: { [key: string]: string[] }): void {
    this.errors = errors;
  }

  /**
   * Clear one or all error fields.
   *
   * @param {string | null} field
   */
  clear(field?: string): void {
    if (field) {
      delete this.errors[field];
      return;
    }
    this.errors = {};
  }
}

export default Errors;
