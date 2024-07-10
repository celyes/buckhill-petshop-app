import http from '@/services/HttpService'
class ProductsService {
  protected http
  constructor() {
    this.http = http
  }

  getProduct(uuid?: string) {
    return http.get('/products', {
      params: {
        category: uuid
      }
    })
  }
}
export default new ProductsService()