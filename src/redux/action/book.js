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

export const searchBook = (token, params = null, getGenre = null) => {
  console.log(params)
  const param = qs.stringify(params)
  const genre = getGenre ? `/${getGenre}` : ''
  const url = `${REACT_APP_URL}books${genre}${'?' + param}`
  console.log(url)
  return {
    type: 'SEARCH_BOOK',
    payload: http(token).get(url)
  }
}

export const addBook = (token, data) => {
  const url = `${REACT_APP_URL}books`
  return {
    type: 'ADD_BOOK',
    payload: http(token).post(url, data, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  }
}

export const clearMessage = () => {
  return {
    type: 'CLEAR_MESSAGE'
  }
}