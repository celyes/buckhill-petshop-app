import http from '@/services/HttpService'
class CategoriesService {
  protected http
  constructor() {
    this.http = http
  }

  getCategories() {
    return this.http.get('/categories')
  }
}
export default new CategoriesService()
