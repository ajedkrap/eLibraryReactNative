import React, { Component } from 'react';
import {
  Text, ScrollView, Dimensions, View, Image, FlatList, SafeAreaView, TouchableOpacity, Alert, ToastAndroid as Toast, ToastAndroid
} from 'react-native'
import {
  Container, Content, H3, Tabs, Tab, Badge, Button, Spinner, ScrollableTab,
} from 'native-base'
import moment from 'moment'
// import Footer from './components/footer'
// import Header from './components/header'

import { REACT_APP_URL } from '../../env'

import Icon from 'react-native-vector-icons/FontAwesome5'

import { connect } from 'react-redux'
import { getUserLoan, newLoan, returnLoan, clearMessage, deleteLoanedBook, deleteAllBook } from '../redux/action/loan'


const deviceWidth = Dimensions.get('screen').width
const deviceHeight = Dimensions.get('screen').height


class Loans extends Component {
  constructor(props) {
    super(props)
    this.state = {
      refresh: false,
      loanedBooks: [],
      history: [],
      favorites: []
    }
  }



  borrow = () => {
    const { loans, onLoan } = this.props.loan
    const { userData } = this.props.auth
    const { id: userId, token } = userData
    const getLoanedBook = loans.filter(loans => loans['id'] === userId)[0]
    const { loanedBook } = getLoanedBook
    const data = {
      books: loanedBook.map(book => book['id']).join(',')
    }
    Alert.alert(
      'Loan Book',
      `Are you Sure, you want to have a loan?`,
      [
        {
          text: 'Cancel',
          onPress: () => console.log('canceled'),
          style: 'cancel'
        },
        {
          text: "OK",
          onPress: () => {
            this.props.newLoan(token, data)
          }
        }
      ]
    )
  }

  return = (id) => {
    const { userData } = this.props.auth
    const { token } = userData
    Alert.alert(
      'Return Book',
      `Are you Sure?`,
      [
        {
          text: 'Cancel',
          onPress: () => console.log('canceled'),
          style: 'cancel'
        },
        {
          text: "OK",
          onPress: () => {
            this.props.returnLoan(token, id)
          }
        }
      ]
    )
  }


  deleteLoanedBook = (index, title) => {
    this.setState({ refresh: !this.state.refresh })
    const { userData } = this.props.auth
    const { onLoan } = this.props.loan
    const { id: userId } = userData
    if (!onLoan) {
      Alert.alert(
        'Delete Loaned Book',
        `Are you Sure, you want to delete ${title}?`,
        [
          {
            text: 'Cancel',
            onPress: () => console.log('canceled'),
            style: 'cancel'
          },
          {
            text: "OK",
            onPress: () => {
              this.props.deleteLoanedBook(index, userId);
              Toast.show(
                `${title} Deleted`,
                Toast.SHORT
              );
            }
          }
        ]
      )
    } else {
      Alert.alert('error')
    }
    this.setState({ refresh: !this.state.refresh })
  }

  deleteAllBook = () => {
    this.setState({ refresh: !this.state.refresh })
    const { userData } = this.props.auth
    const { onLoan } = this.props.loan
    const { id: userId } = userData
    if (!onLoan) {
      Alert.alert(
        'Delete Loaned Book',
        `Are you Sure, you want to delete all?`,
        [
          {
            text: 'Cancel',
            onPress: () => console.log('canceled'),
            style: 'cancel'
          },
          {
            text: "OK",
            onPress: () => {
              this.props.deleteAllBook(userId)
              Toast.show(
                'Loaned Book Cleared',
                Toast.SHORT
              )
            }
          }
        ]
      )
    } else {
      Alert.alert('error')
    }
    this.setState({ refresh: !this.state.refresh })
  }

  getLoanData = (loanedBooks) => {
    const { favorites: fav, history: his } = this.state
    const getTitle = loanedBooks.map(obj => obj.book['title']);
    const titles = [...new Set(getTitle)]
    const data = titles.map(title => {
      return {
        book: loanedBooks.filter(str => str.book.title === title)[0],
        fav: getTitle.filter(str => str === title).length
      }
    })
    fav.push(...data.sort((a, b) => b.fav - a.fav))
    his.push(...data.sort((a, b) => b.book.loan_date - a.book.loan_date))
    // const { favorites } = this.state
    // const count = [...new Set(history)].map(history => [history.book.title, history[book.title].join("").split(history.book.title).length - 1]);

    // for (let i = 0; i < count.length; i++) {
    //   favorites.push({
    //     title: [i][0],
    //     favs: [i][2]
    //   })
    // }
  }

  componentDidUpdate() {
    const { message, isError, onLoan } = this.props.loan
    if (message !== null) {
      if (!onLoan) {
        if (isError) {
          Alert.alert(
            'Return Failed',
            message
          )
        }
        else {
          Alert.alert(
            'Book Return',
            message
          )
        }
      } else {
        if (isError) {
          Alert.alert(
            'Loan Failed',
            message
          )
        }
        else {
          Alert.alert(
            'Loan Recorded',
            message,
          )
        }
      }

      this.props.clearMessage()
    }
  }

  componentDidMount() {
    this.props.clearMessage()
    const { auth, loan } = this.props
    const { userData, isAdmin } = auth
    const { token, id } = userData
    if (!isAdmin) {
      this.props.getUserLoan(token, id)
    }
    const { loanedBooks } = this.state
    const { loanData } = loan
    loanData.map((loan, loanId) => {
      loan.books.map((book, bookId) => {
        return loanedBooks.push({
          id: loanId + '' + bookId,
          loan_date: loan.loan_date,
          due_date: loan.due_date,
          return_date: loan.return_date,
          book
        })
      })
    })
    this.getLoanData(loanedBooks)
  }

  render() {
    const { loans, isSelecting, onLoan, isLoading: loanLoading, loanData, userLoan } = this.props.loan
    const { userData, isAdmin } = this.props.auth
    const { id: userId } = userData
    const { history, favorites } = this.state
    console.log(userLoan)

    const getOnLoan = loanData.filter(loan => loan.user_id === userId && loan.status === 'On Loan')[0]
    const { books: bookOnLoan, due_date: dueDate, loan_date: loanDate, id: loanId } = getOnLoan
    const getLoanedBook = loans.filter(loans => loans['id'] === userId)[0]
    const { loanedBook } = getLoanedBook
    return (
      <Container>
        <Tabs initialPage={1} tabBarUnderlineStyle={{ display: 'none' }} renderTabBar={() => <ScrollableTab style={{ backgroundColor: 'transparent', borderWidth: 0, height: 50 }} />}>

          {/* HISTORY */}

          <Tab heading="History"
            textStyle={{ color: 'grey', fontSize: 12 }}
            tabStyle={{ backgroundColor: 'transparent', padding: 0 }}
            activeTabStyle={{ backgroundColor: 'transparent' }}
            activeTextStyle={{ color: '#58e6e6' }}>
            <View style={{ marginVertical: 20 }}>
              <H3 style={{ textAlign: 'center' }}>
                Recently Loan
            </H3>
            </View>
            {/* <ScrollView> */}
            {history.length === 0 &&
              <View style={{ alignItems: 'center' }}>
                <Text> history empty </Text>
              </View>
            }
            {history.length !== 0 &&
              <FlatList
                initialNumToRender={10}
                keyExtractor={(item, index) => item.id + '' + index}
                data={history}
                renderItem={({ item }) => (
                  <View style={{ flexDirection: 'row', flex: 1, height: 170, paddingHorizontal: 5, marginHorizontal: 5, paddingVertical: 9 }}>
                    <View style={{ flex: 2, backgroundColor: 'black', elevation: 8, zIndex: 1, marginRight: 10 }}>
                      <Image source={{
                        uri: REACT_APP_URL + item.book.book.image
                      }} style={{ flex: 1, height: null, width: null, resizeMode: "cover", }} alt='loaned-books' />
                    </View>
                    <View style={{ flex: 4 }}>
                      <View style={{ flex: 1, flexDirection: 'column' }}>
                        <Text style={{ fontSize: 18, fontWeight: 'bold', flex: 2 }}>
                          {item.book.book.title}
                        </Text>
                        <Text style={{ flex: 2, textTransform: 'capitalize' }}>
                          {item.book.book.author.join(', ')}
                        </Text>
                        <View style={{ flex: 3, flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'flex-end' }}>
                          <Text >
                            Last Loaned: {moment(item.book.loan_date).format('DD MMM YYYY')}
                          </Text>
                        </View>
                      </View>
                    </View>
                  </View>
                )} />}
            {/* </ScrollView> */}
          </Tab>

          {/* LOANS */}

          <Tab heading="Loans"
            textStyle={{ fontSize: 24, color: 'grey' }}
            tabStyle={{ backgroundColor: 'transparent', padding: 0, justifyContent: 'flex-start' }}
            activeTabStyle={{ backgroundColor: 'transparent' }}
            activeTextStyle={{ color: '#58e6e6' }}>
            <View style={{ flexDirection: 'row', marginVertical: 20, marginHorizontal: 20, height: 40, justifyContent: 'space-between', alignItems: "center" }}>
              <View style={{}}>
                <H3>
                  Loaned Books
              </H3>
              </View>
            </View>
            {loanLoading &&
              <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Spinner color='#4bf1f1' />
              </View>
            }
            {!loanLoading && loanedBook.length === 0 && isSelecting &&
              <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ fontSize: 24, marginBottom: 10 }}>No Data..</Text>
                <TouchableOpacity style={{ alignItems: 'center', padding: 15, flexDirection: 'row', backgroundColor: '#01bdbd', borderRadius: 5 }}
                  onPress={() => this.props.navigation.navigate('search')}>
                  <Icon name='search-plus' style={{ color: 'white', paddingRight: 10 }} />
                  <Text style={{ color: 'white' }}>Borrow Now</Text>
                </TouchableOpacity>

              </View>
            }
            {!loanLoading && loanedBook.length !== 0 && isSelecting &&
              <FlatList
                keyExtractor={(item, index) => item.id.toString() + index}
                refreshing={this.state.refresh}
                data={loanedBook}
                renderItem={({ item, index }) => (
                  <View style={{ flexDirection: 'row', flex: 1, height: 170, paddingHorizontal: 5, marginHorizontal: 5, paddingVertical: 9 }}>
                    <View style={{ flex: 2, backgroundColor: 'black', elevation: 8, zIndex: 1, marginRight: 10 }}>
                      <Image source={{ uri: REACT_APP_URL + item.image }} style={{ flex: 1, height: null, width: null, resizeMode: "cover", }} alt='loaned-books' />
                    </View>
                    <View style={{ flex: 4 }}>
                      <View style={{ flex: 1, flexDirection: 'column' }}>
                        <Text style={{ fontSize: 18, fontWeight: 'bold', flex: 2 }}>
                          {item.title}
                        </Text>
                        <Text style={{ flex: 2, textTransform: 'capitalize' }}>
                          {item.author.join(', ')}
                        </Text>
                        <View style={{ flex: 3, flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between' }}>
                          <Text style={{ fontSize: 24, color: 'green' }} >
                            {item.status}
                          </Text>
                          <Button danger style={{ padding: 10, paddingVertical: 5, height: null }}
                            onPress={() => this.deleteLoanedBook(index, item.title)}>
                            <Icon color='white' name='trash' />
                          </Button>
                        </View>
                      </View>
                    </View>
                  </View>
                )} ListFooterComponent={() => <View style={{ alignItems: 'center', flexDirection: 'row', marginVertical: 20, justifyContent: 'center' }}>
                  <Button danger style={{ paddingHorizontal: 20, borderRadius: 5, width: 100, marginHorizontal: 5, justifyContent: 'center' }}
                    onPress={() => this.deleteAllBook()}>
                    <Icon style={{ color: 'white', marginRight: 5 }} name='trash' />
                    <Text style={{ color: 'white' }}>Delete All</Text>
                  </Button>
                  <Button style={{ backgroundColor: 'green', borderRadius: 5, width: 100, marginHorizontal: 5, justifyContent: 'center' }}
                    onPress={() => this.borrow()}>
                    <Icon style={{ color: 'white', marginRight: 5 }} name='book-reader' />
                    <Text style={{ color: 'white' }}>Loans</Text>
                  </Button>
                </View>} />
            }

            {!loanLoading && getOnLoan && onLoan && !isAdmin &&
              < FlatList
                keyExtractor={(item, index) => item.id + index}
                data={bookOnLoan}
                renderItem={({ item }) => (
                  <View style={{ flexDirection: 'row', flex: 1, height: 170, paddingHorizontal: 5, marginHorizontal: 5, paddingVertical: 9 }}>
                    <View style={{ flex: 2, backgroundColor: 'black', elevation: 8, zIndex: 1, marginRight: 10 }}>
                      <Image source={{ uri: REACT_APP_URL + item.image }} style={{ flex: 1, height: null, width: null, resizeMode: "cover", }} alt='loaned-books' />
                    </View>
                    <View style={{ flex: 4 }}>
                      <View style={{ flex: 1, flexDirection: 'column' }}>
                        <Text style={{ fontSize: 18, fontWeight: 'bold', flex: 2 }}>
                          {item.title}
                        </Text>
                        <View style={{ flex: 3, flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between' }}>
                          <Text style={{ fontSize: 24 }} >
                            Booked
                            </Text>
                        </View>
                      </View>
                    </View>
                  </View>
                )} ListFooterComponent={() =>
                  <View style={{ alignItems: 'center', marginVertical: 20, justifyContent: 'center' }}>
                    <View style={{ marginVertical: 10 }}>
                      <Text>Loaned at : {moment(loanDate).format('DD MMMM YYYY')}</Text>
                      <Text>Due at : {moment(dueDate).format('DD MMMM YYYY')}</Text>
                    </View>
                    <Button success style={{ paddingHorizontal: 20, borderRadius: 5, width: 100, marginHorizontal: 5, justifyContent: 'center' }}
                      onPress={() => this.return(loanId)}>
                      <Icon style={{ color: 'white', marginRight: 5 }} name='hippo' />
                      <Text style={{ color: 'white' }}>Return</Text>
                    </Button>
                  </View>} />

            }

          </Tab>

          {/* FAVOURITES */}

          <Tab heading="Favorites"
            textStyle={{ fontSize: 24, color: 'grey' }}
            tabStyle={{ backgroundColor: 'transparent', padding: 0, justifyContent: 'flex-start' }}
            activeTabStyle={{ backgroundColor: 'transparent' }}
            activeTextStyle={{ color: '#58e6e6' }}>
            <View style={{ marginVertical: 20 }}>
              <H3 style={{ textAlign: 'center' }}>
                Recently Loan
            </H3>
            </View>

            <FlatList
              keyExtractor={(item, index) => index}
              data={favorites}
              renderItem={({ item }) => (
                <View style={{ flexDirection: 'row', flex: 1, height: 170, paddingHorizontal: 5, marginHorizontal: 5, paddingVertical: 9 }}>
                  <View style={{ flex: 2, backgroundColor: 'black', elevation: 8, zIndex: 1, marginRight: 10 }}>
                    <Image source={
                      { uri: REACT_APP_URL + item.book.book.image }
                    } style={{ flex: 1, height: null, width: null, resizeMode: "cover", }} alt='loaned-books' />
                  </View>
                  <View style={{ flex: 4 }}>
                    <View style={{ flex: 1, flexDirection: 'column' }}>
                      <Text style={{ fontSize: 18, fontWeight: 'bold', flex: 2 }}>
                        {item.book.book.title}
                      </Text>
                      <Text style={{ flex: 2, textTransform: 'capitalize' }}>
                        {item.book.book.author.join(', ')}
                      </Text>
                      <View style={{ flex: 3, flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'flex-end' }}>
                        <Text >
                          Loaned: {item.fav > 1 ? item.fav + ' Times' : item.fav + ' Time'}
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
              )} />
          </Tab>
        </Tabs>
      </Container >
    );
  }
}



const mapStateToProps = (state) => ({
  auth: state.auth,
  loan: state.loan
})

const mapDispatchToProps = { getUserLoan, deleteAllBook, deleteLoanedBook, newLoan, returnLoan, clearMessage, }


export default connect(mapStateToProps, mapDispatchToProps)(Loans);
