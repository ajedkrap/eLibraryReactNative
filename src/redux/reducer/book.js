const initialState = {
  isLoading: false,
  isError: false,
  books: []
}

const book = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_BOOK_PENDING': {
      return {
        ...state,
        isLoading: true,
        isError: false,
      }
    }
    case 'GET_BOOK_REJECTED': {
      return {
        ...state,
        isLoading: false,
        isError: true,
      }
    }
    case 'GET_BOOK_FULFILLED': {
      const { data } = action.payload.data
      return {
        ...state,
        isLoading: false,
        isError: false,
        books: data
      }
    }
    default: {
      return {
        state
      }
    }
  }
}
export default book