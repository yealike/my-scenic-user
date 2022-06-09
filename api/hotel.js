import request from '@/utils/request'
export default {
  getAll() {
    return request.get('/scenic/hotel/all')
  },
  getPart(page, size) {
    return request.post(`/scenic/hotel/query/${page}/${size}`, {
      address: '',
      brand: '',
      business: '',
      city: '',
      name: '',
      price: false,
      score: false,
      starName: '',
    })
  },
  getById(id) {
    return request.get(`/scenic/hotel/${id}`)
  },
  getByName(name) {
    return request.post(`/scenic/hotel/category`, {
      name,
    })
  },
}
