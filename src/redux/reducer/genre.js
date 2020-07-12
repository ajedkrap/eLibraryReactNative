const initialState = {
  isLoading: false,
  isError: false,
  genres: []
}

const genre = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_GENRE_PENDING': {
      return {
        ...state,
        isLoading: true,
        isError: false,
      }
    }
    case 'GET_GENRE_REJECTED': {
      return {
        ...state,
        isLoading: false,
        isError: true,
      }
    }
    case 'GET_GENRE_FULFILLED': {
      const { data } = action.payload.data
      return {
        ...state,
        isLoading: false,
        isError: false,
        genres: data
      }
    }
    default: {
      return state
    }
  }
}
export default genre