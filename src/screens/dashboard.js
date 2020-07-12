import React, { Component } from 'react';
import {
  Image, StyleSheet, View, SafeAreaView, ScrollView, FlatList, Dimensions
} from 'react-native'
import {
  Container, Title, Content, Text, Icon, Fab, Button
} from 'native-base';
import moment from 'moment'


import { connect } from 'react-redux'
import { getBook } from '../redux/action/book'
import { getUserLoan } from '../redux/action/loan'

import Books from './components/books';
import Header from './components/header';

const deviceWidth = Dimensions.get('screen').width
const deviceHeight = Dimensions.get('screen').height

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      active: false
    }
  }

  componentDidMount() {
    const { userData, isAdmin } = this.props.auth
    const { loans } = this.props.loan
    const { id, token } = userData
    const getLoan = loans.filter(loans => loans['id'] === id)
    if (getLoan.length === 0) {
      const newLoan = {
        id,
        loanedBook: []
      }
      loans.push(newLoan)
    }
    this.props.getBook(token)
    if (!isAdmin) {
      this.props.getUserLoan(token, id)
    }
  }

  render() {

    const { navigation, book, loan, auth } = this.props
    const { isLoading: bookLoad, books } = book
    const { userData, isAdmin } = auth
    const { id: userId } = userData
    const { loanData, onLoan } = loan

    if (!isAdmin) {
      const getOnLoan = loanData.filter(loan => loan.user_id === userId && loan.status === 'On Loan')[0]
      const { due_date: dueDate, loan_date: loanDate, status } = getOnLoan
      const getReturn = loanData.filter(loan => loan.user_id === userId && loan.status === 'Returned')[0]
    }
    return (
      <Container>
        {bookLoad &&
          <View style={{ position: 'absolute', height: deviceHeight, width: deviceWidth, backgroundColor: 'rgba(0,0,0,0.25)', flex: 1, alignItems: 'center', justifyContent: 'center', zIndex: 30 }}>
            <Text>
              Loading
            </Text>
          </View>
        }

        <Header goToSearch={() => navigation.navigate('search')} />

        <Content padder>
          {!bookLoad && isAdmin &&
            <View style={{ flex: 1 }}>
              <Button style={{ justifyContent: 'center', backgroundColor: '#87ceeb', elevation: 3 }}>
                <Icon name='book-medical' type='FontAwesome5' />
                <Text>Add Book</Text>
              </Button>
            </View>
          }
          <SafeAreaView style={{ flex: 1, zIndex: 1 }} >
            <ScrollView>
              {/* <View>
                <View style={{ alignItems: "flex-end", marginHorizontal: 5, justifyContent: 'space-between', flexDirection: 'row', marginTop: 20 }}>
                  <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Search Catalog</Text>
                  <Text style={{ fontSize: 12, color: '#01bdbd' }}>Advance Search +</Text>
                </View>
                <View style={{ flex: 1, borderColor: 'grey', borderWidth: 1, flexDirection: 'row', alignItems: 'center', marginTop: 20 }}>
                  <TextInput placeholder='Search by Title' style={{ flex: 6 }} />
                  <Icon name='search' style={{ flex: 1 }} />
                </View>
              </View> */}
              {!bookLoad && books.length === 0 &&
                <View>
                  <Text>Fetch Error</Text>
                </View>
              }
              {!bookLoad && books.length !== 0 &&
                <View style={{ marginTop: 10, borderBottomColor: 'rgba(200,200,200,0.5)', borderBottomWidth: 1 }}>
                  <View style={{ alignItems: "flex-end", marginHorizontal: 5, justifyContent: 'space-between', flexDirection: 'row', marginTop: 20, paddingBottom: 10 }}>
                    <Text style={{ fontSize: 30, color: '#53b4b4', fontWeight: 'bold' }}>Our Collection</Text>
                    <Text style={{ fontSize: 16, color: '#01bdbd' }}>View All</Text>
                  </View>
                  <View style={{ height: 210, marginTop: 10 }}>
                    <FlatList
                      horizontal={true}
                      showsHorizontalScrollIndicator={false}
                      keyExtractor={books => books.id.toString()}
                      data={books}
                      renderItem={book =>
                        <Books getBook={book['item']} detail={() => navigation.navigate('Detail', book['item'])} />
                      }
                    />
                  </View>
                </View>
              }
              {onLoan && !isAdmin &&
                <View style={{ paddingVertical: 10, borderBottomColor: 'rgba(200,200,200,0.5)', borderBottomWidth: 1 }}>
                  <Text style={{ textAlign: 'right', fontSize: 30, color: '#53b4b4', fontWeight: 'bold' }}>You Are On Loan</Text>
                  <View style={{ backgroundColor: 'rgb(230,230,230)', margin: 10, padding: 15, elevation: 2 }}>
                    <Text style={{ marginVertical: 5 }}>Loan Date : {moment(loanDate).format('DD MMMM YYYY')}</Text>
                    <Text style={{ marginVertical: 5 }}>Due Date : {moment(dueDate).format('DD MMMM YYYY')}</Text>
                    <Text style={{ marginVertical: 5 }}>Status : {status}</Text>
                  </View>
                  <Text style={{ textAlign: 'right', fontStyle: 'italic' }}>Mind to Return On Time</Text>
                </View>
              }
            </ScrollView>
          </SafeAreaView>
        </Content>
      </Container >
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  book: state.book,
  loan: state.loan
})

const mapDispatchToProps = { getBook, getUserLoan }

export default connect(mapStateToProps, mapDispatchToProps)(Home)