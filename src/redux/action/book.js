import http from '../../helper/http'
import qs from 'querystring'
import { REACT_APP_URL } from '../../../env'

export const getBook = (token, params = null) => {
  const param = qs.stringify(params)
  const url = `${REACT_APP_URL}books?${param}`
  return {
    type: 'GET_BOOK',
    payload: http(token).get(url)
  }
}