const initialState = {
  loanedBook: [],
  history: [],
  favorites: [],
  isSelecting: true,
  onLoan: false,
  loanData: {}
}

const loan = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_LOANED_BOOK': {
      const loanedBook = state.loanedBook
      loanedBook.push(action.payload)
      return {
        ...state
      }
    }
    case 'DELETE_LOANED_BOOK': {
      const loanedBook = state.loanedBook
      loanedBook.splice(action.payload, 1)
      return {
        ...state
      }
    }
    case 'DELETE_ALL_BOOK': {
      return {
        ...state,
        loanedBook: []
      }
    }
    default: {
      return {
        state
      }
    }
  }
}

export default loan