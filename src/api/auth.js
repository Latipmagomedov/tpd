import api from './api'

const auth = {
  postLogin(initdata) {
    return api.post(`/auth`, {
      initdata: initdata
    })
  },
  getUser() {
    return api.get(`/user`)
  },
  postClaim(body) {
    return api.post(`/claim`, body)
  }
}
export default auth
