import http from '../../helper/http'
import qs from 'querystring'
import { REACT_APP_URL } from '../../../env'

export const signUp = (signUpData) => {
  const url = `${REACT_APP_URL}auth/signup`
  const data = qs.stringify(signUpData)
  return {
    type: 'SIGN_UP',
    payload: http().post(url, data)
  }
}

export const login = (loginData) => {
  const url = `${REACT_APP_URL}auth/login`
  const data = qs.stringify(loginData)
  return {
    type: 'LOG_IN',
    payload: http().post(url, data)
  }
}

export const logout = () => {
  return {
    type: 'LOG_OUT'
  }
}

export const clearMessage = () => {
  return {
    type: 'CLEAR_MESSAGE'
  }
}