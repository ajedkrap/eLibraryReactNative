const initialState = {
  isLoading: false,
  isError: false,
  loans: [],
  isSelecting: true,
  onLoan: false,
  loanData: [],
  userLoan: {},
  message: null
}

const loan = (state = initialState, action) => {


  switch (action.type) {
    case 'CLEAR_MESSAGE': {
      return {
        ...state,
        message: null
      }
    }

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
    case 'DELETE_LOANED_BOOK': {
      let loans = state.loans
      const { id, index } = action.payload
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
            loan.loanedBook.splice(index, 1)
          }
          return loan
        })
      }
      return {
        ...state,
        ...{ loans }
      }
    }
    case 'DELETE_ALL_LOAN': {
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
            loan.loanedBook = []
          }
          return loan
        })
      }
      return {
        ...state,
        ...{ loans }
      }
    }
    case 'LOAN_PENDING': {
      return {
        ...state,
        isLoading: true,
        isError: false,
      }
    }
    case 'LOAN_REJECTED': {
      return {
        ...state,
        isLoading: false,
        isError: true,
        message: action.payload.response.data.message
      }
    }
    case 'LOAN_FULFILLED': {
      const { data, message } = action.payload.data
      const { user_id: userId } = data
      let loans = state.loans
      const getLoan = loans.filter(loan => {
        loan.id === userId
      })
      if (getLoan.length !== 0) {
        loans.push({
          id,
          loanedBook: []
        })
      } else {
        loans = loans.map(loan => {
          if (loan.id === userId) {
            loan.loanedBook = []
          }
          return loan
        })
      }
      return {
        ...state,
        isSelecting: false,
        onLoan: true,
        isLoading: false,
        isError: false,
        userLoan: data,
        message,
        ...{ loans }
      }
    }
    case 'RETURN_LOAN_PENDING': {
      return {
        ...state,
        isLoading: true,
        isError: false,
      }
    }
    case 'RETURN_LOAN_REJECTED': {
      return {
        ...state,
        isLoading: false,
        isError: true,
        message: action.payload.response.data.message
      }
    }
    case 'RETURN_LOAN_FULFILLED': {
      const { data, message } = action.payload.data
      return {
        ...state,
        isSelecting: true,
        onLoan: false,
        isLoading: false,
        isError: false,
        userLoan: {},
        message,
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
    //     ...state,
    //     ...{loans}
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
    //     ...{loans}
    //   }
    // }
    default: {
      return state
    }
  }
}

export default loan