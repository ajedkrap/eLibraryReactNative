import http from '../../helper/http'
// import qs from 'querystring'
import { REACT_APP_URL } from '../../../env'

export const getGenre = (token) => {
  const url = `${REACT_APP_URL}genre`
  return {
    type: 'GET_GENRE',
    payload: http(token).get(url)
  }
}