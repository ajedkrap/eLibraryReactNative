import { getLoanedBook } from "../action/loan"

const initialState = {
  isLoading: false,
  isError: false,
  loans: [],
  history: [],
  favorites: [],
  isSelecting: true,
  onLoan: false,
  loanData: []
}

const loan = (state = initialState, action) => {


  switch (action.type) {

    case 'GET_USER_LOAN_PENDING': {
      return {
        ...state,
        isLoading: true,
        isError: false,
      }
    }
    case 'GET_USER_LOAN_REJECTED': {
      return {
        ...state,
        isLoading: false,
        isError: true,
      }
    }
    case 'GET_USER_LOAN_FULFILLED': {
      const { data } = action.payload.data
      return {
        ...state,
        isLoading: false,
        isError: false,
        loanData: data
      }
    }
    case 'ADD_LOANED_BOOK': {
      let loans = state.loans
      const { id, data } = action.payload
      const getLoan = loans.filter(loan => {
        loan.id === id
      })
      if (getLoan.length !== 0) {
        loans.push({
          id,
          loanedBook: []
        })
      } else {
        loans = loans.map(loan => {
          if (loan.id === id) {
            loan.loanedBook.push(data)
          }
          return loan
        })
      }
      return {
        ...state,
        ...{ loans }
      }
    }
    // case 'DELETE_LOANED_BOOK': {
    //   const loans = state.loans
    //   const { id, index } = action.payload
    //   const getUserIndex  = loans.filter(loan => loan.id === id)
    //   const getLoan = loans.filter(loan => {
    //     loan.id !== id
    //   })
    //   loans.map(loan => {
    //     if (loan.id === id) {
    //       loan.loanedbook.splice(index, 1)
    //     }
    //     return loan
    //   })
    //   return {
    //     ...state
    //   }
    // }
    // case 'DELETE_ALL_LOAN': {
    //   const loans = state.loans
    //   const { id } = action.payload
    //   loans.map(loan => {
    //     if (loan.id === id) {
    //       loan.loanedbook = []
    //     }
    //     return loan
    //   })
    //   return {
    //     ...state
    //   }
    // }
    default: {
      return state
    }
  }
}

export default loan