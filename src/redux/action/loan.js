export const addLoanedBook = (data) => {
  return {
    type: 'ADD_LOANED_BOOK',
    payload: data
  }
}

export const deleteLoanedBook = (index) => {
  return {
    type: 'DELETE_LOANED_BOOK',
    payload: index
  }
}
export const deleteLoanedBook = () => {
  return {
    type: 'DELETE_ALL_LOAN',
  }
}