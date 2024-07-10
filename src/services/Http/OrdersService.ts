import http from '@/services/HttpService'
class OrdersService {
  protected http
  constructor() {
    this.http = http
  }

  getOrders() {
    return this.http.get('/orders')
  }
}
export default new OrdersService()