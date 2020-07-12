const initialState = {
  isLoading: false,
  isError: false,
  isAdmin: false,
  isLogin: false,
  message: null,
  userData: {}
}

const auth = (state = initialState, action) => {
  switch (action.type) {
    case 'CLEAR_MESSAGE': {
      return {
        ...state,
        message: null
      }
    }
    case 'SIGN_UP_PENDING': {
      return {
        ...state,
        isLoading: true,
        isError: false,
      }
    }
    case 'SIGN_UP_REJECTED': {
      return {
        ...state,
        isLoading: false,
        isError: true,
        message: action.payload.message
      }
    }
    case 'SIGN_UP_FULFILLED': {
      return {
        ...state,
        isLoading: false,
        isError: false,
        message: action.payload.data.message
      }
    }
    case 'LOG_IN_PENDING': {
      return {
        ...state,
        isLoading: true,
        isError: false,
      }
    }
    case 'LOG_IN_REJECTED': {
      let message = state.message
      const { message: netError } = action.payload
      const { message: authError } = action.payload.response.data
      if (authError) {
        message = authError
      } else if (netError) {
        message = netError
      }
      return {
        ...state,
        isLoading: false,
        isError: true,
        message
      }
    }
    case 'LOG_IN_FULFILLED': {
      const { data } = action.payload

      return {
        ...state,
        isLoading: false,
        isError: false,
        isLogin: true,
        userData: data.data,
        isAdmin: data.data.roles === 'admin',
        message: data.message
      }
    }
    case 'LOG_OUT': {
      return {
        ...state,
        isLogin: false
      }
    }
    default: {
      return state
    }
  }
}

export default auth