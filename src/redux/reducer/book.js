const initialState = {
  isLoading: false,
  isError: false,
  books: [],
  searchBooks: [],
  searchPage: {},
  message: null
}

const book = (state = initialState, action) => {
  switch (action.type) {
    case 'CLEAR_MESSAGE': {
      return {
        ...state,
        message: null
      }
    }
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
    case 'SEARCH_BOOK_PENDING': {
      return {
        ...state,
        isLoading: true,
        isError: false,
      }
    }
    case 'SEARCH_BOOK_REJECTED': {
      return {
        ...state,
        isLoading: false,
        isError: true,
      }
    }
    case 'SEARCH_BOOK_FULFILLED': {
      const { data, options } = action.payload.data
      let searchBooks = state.searchBooks
      const { page } = options
      if (page === 1) {
        searchBooks = data
      } else {
        searchBooks.concat(...data)
      }
      return {
        ...state,
        isLoading: false,
        isError: false,
        searchBooks,
        searchPage: options,
      }
    }
    case 'ADD_BOOK_PENDING': {
      return {
        isLoading: true,
        isError: false
      }
    }
    case 'ADD_BOOK_REJECTED': {
      return {
        isLoading: false,
        isError: true,
        message: action.payload.response.data.message
      }
    }
    case 'ADD_BOOK_FULFILLED': {
      return {
        isLoading: false,
        isError: false,
        message: action.payload.data.message
      }
    }
    default: {
      return state
    }
  }
}
export default book