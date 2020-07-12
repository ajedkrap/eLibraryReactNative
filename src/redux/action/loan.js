import http from '../../helper/http'
// import qs from 'querystring'
import { REACT_APP_URL } from '../../../env'


export const getUserLoan = (token, id = null) => {
  const getId = id ? `user/${id}` : null
  const url = `${REACT_APP_URL}loans/${getId}`
  return {
    type: 'GET_USER_LOAN',
    payload: http(token).get(url)
  }
}

export const getLoanedBook = (token) => {
  const url = `${REACT_APP_URL}loans/book`
  return {
    type: 'GET_LOANED_BOOK',
    payload: http(token).get(url)
  }
}

export const addLoanedBook = (data, id) => {
  return {
    type: 'ADD_LOANED_BOOK',
    payload: { id, data }
  }
}

export const deleteLoanedBook = (index, id) => {
  return {
    type: 'DELETE_LOANED_BOOK',
    payload: { id, index }
  }
}
export const deleteAllBook = (id) => {
  return {
    type: 'DELETE_ALL_LOAN',
    payload: { id }
  }
}
export const newLoan = (token, data) => {
  const url = `${REACT_APP_URL}loans`
  return {
    type: 'LOAN',
    payload: http(token).post(url, data),
  }
}
export const returnLoan = (token, id) => {
  const url = `${REACT_APP_URL}loans/${id}`
  console.log(url)
  return {
    type: 'RETURN_LOAN',
    payload: http(token).patch(url)
  }
}

export const clearMessage = () => {
  return {
    type: 'CLEAR_MESSAGE'
  }
}