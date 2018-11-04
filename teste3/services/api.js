import { http } from './config'

export default {
  ApiGet: (url='') => {
    return http.get(url)
  },

  ApiPost:(ies)=> {
    return http.post('params', params)
  }
}