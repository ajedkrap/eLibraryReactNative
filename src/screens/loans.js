import React, { Component } from 'react';
import {
  Text, ScrollView, Dimensions, View, Image, FlatList, SafeAreaView, TouchableOpacity, Alert
} from 'react-native'
import {
  Container, Content, H3, Tabs, Tab, Badge, Button, Spinner, ScrollableTab
} from 'native-base'

// import Footer from './components/footer'
// import Header from './components/header'

import { REACT_APP_URL } from '../../env'
import saiki from '../assets/saiki.png'
import tate from '../assets/tate.jpg'
import yoza from '../assets/yoza.jpg'
import croma from '../assets/croma.jpg'

import Icon from 'react-native-vector-icons/FontAwesome5'

import { connect } from 'react-redux'
import { deleteLoanedBook, deleteAllBook } from '../redux/action/loan'

const deviceWidth = Dimensions.get('screen').width
const deviceHeight = Dimensions.get('screen').height

const DATA = [
  {
    id: '1',
    title: 'Cromartie High School',
    author: 'Eiji Nonaka',
    status: 'Available',
    image: croma,
    loan_date: '12-12-1212',
    fav: '5'
  },
  {
    id: '2',
    title: 'Tate No Yuusha',
    author: 'Aneko Yusagi',
    status: 'Available',
    image: tate,
    loan_date: '12-12-1212',
    fav: '3'
  },
  {
    id: '3',
    title: 'Mission: Yozakura Family',
    author: 'Hitsuji Gondaira',
    status: 'Available',
    image: yoza,
    loan_date: '12-12-1212',
    fav: '4'
  },
  {
    id: '4',
    title: 'Saiki Kusuo no Psi Nan',
    author: 'Shūichi Asō',
    status: 'Available',
    image: saiki,
    loan_date: '12-12-1212',
    fav: '9'
  },
];

class Loans extends Component {
  constructor(props) {
    super(props)
    this.state = {
      refresh: false
    }
  }



  UNSAFE_componentWillMount() {
    this.setState({ refresh: !this.state.refresh })
    this.setState({ refresh: !this.state.refresh })
  }

  deleteLoanedBook = (index) => {
    this.setState({ refresh: !this.state.refresh })
    const { userData } = this.props.auth
    const { loans, onLoan } = this.props.loan
    const { id: userId } = userData
    if (!onLoan) {
      loans.map(loan => {
        const { loanedBook } = loan
        if (loan.id === userId) {
          loanedBook.splice(index, 1)
        }
        return loan
      })
    } else {
      Alert.alert('error')
    }
    this.setState({ refresh: !this.state.refresh })
  }

  deleteAllBook = () => {
    this.setState({ refresh: !this.state.refresh })
    const { userData } = this.props.auth
    const { loans, onLoan } = this.props.loan
    const { id: userId } = userData
    if (!onLoan) {
      loans.map(loan => {
        const { loanedBook } = loan
        if (loan.id === userId) {
          loanedBook.splice(0, loanedBook.length)
        }
        return loan
      })
    } else {
      Alert.alert('error')
    }
    this.setState({ refresh: !this.state.refresh })
  }

  componentDidMount() {

  }

  render() {
    const { history, favorites, loans, isSelecting, onLoan, isLoading: loanLoading, loanData } = this.props.loan
    const { userData } = this.props.auth
    const { id: userId } = userData

    const getLoanedBook = loans.filter(loans => loans['id'] === userId)[0]
    const { id, loanedBook } = getLoanedBook
    console.log(loanedBook)
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
            <SafeAreaView style={{ paddingBottom: 60 }}>
              {/* <ScrollView> */}
              {history.length === 0 &&
                <View style={{ alignItems: 'center' }}>
                  <Text> history empty </Text>
                </View>
              }
              {history.length !== 0 && <FlatList
                style={{ marginBottom: 90 }}
                keyExtractor={item => item.id}
                data={history}
                renderItem={({ item }) => (
                  <View style={{ flexDirection: 'row', flex: 1, height: 170, paddingHorizontal: 5, marginHorizontal: 5, paddingVertical: 9 }}>
                    <View style={{ flex: 2, backgroundColor: 'black', elevation: 8, zIndex: 1, marginRight: 10 }}>
                      <Image source={item.image} style={{ flex: 1, height: null, width: null, resizeMode: "cover", }} alt='loaned-books' />
                    </View>
                    <View style={{ flex: 4 }}>
                      <View style={{ flex: 1, flexDirection: 'column' }}>
                        <Text style={{ fontSize: 18, fontWeight: 'bold', flex: 2 }}>
                          {item.title}
                        </Text>
                        <Text style={{ flex: 2 }}>
                          {item.author}
                        </Text>
                        <View style={{ flex: 3, flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'flex-end' }}>
                          <Text >
                            Date Loaned: {item.loan_date}
                          </Text>
                        </View>
                      </View>
                    </View>
                  </View>
                )} />}
              {/* </ScrollView> */}
            </SafeAreaView>
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
            <SafeAreaView>
              {loanLoading &&
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                  <Spinner color='#4bf1f1' />
                </View>
              }
              {!loanLoading && loanedBook.length === 0 &&
                <View>
                  <Text>No Data..</Text>
                  <Text>Borrow Book Now</Text>
                </View>
              }
              {!loanLoading && loanedBook.length !== 0 && isSelecting &&
                <FlatList

                  style={{ marginBottom: 90 }}
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
                          <Text style={{ flex: 2 }}>
                            {item.author}
                          </Text>
                          <View style={{ flex: 3, flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between' }}>
                            <Text style={{ fontSize: 24, color: 'green' }} >
                              {item.status}
                            </Text>
                            <Button danger style={{ padding: 10, paddingVertical: 5, height: null }}
                              onPress={() => this.deleteLoanedBook(index, userId)}>
                              <Icon color='white' name='trash' />
                            </Button>
                          </View>
                        </View>
                      </View>
                    </View>
                  )} ListFooterComponent={() => <View style={{ alignItems: 'center', flexDirection: 'row', marginVertical: 20, justifyContent: 'center' }}>
                    <Button danger style={{ paddingHorizontal: 20, borderRadius: 5, width: 100, marginHorizontal: 5, justifyContent: 'center' }}
                      onPress={this.deleteAllBook}>
                      <Icon style={{ color: 'white', marginRight: 5 }} name='trash' />
                      <Text style={{ color: 'white' }}>Delete All</Text>
                    </Button>
                    <Button style={{ backgroundColor: 'green', borderRadius: 5, width: 100, marginHorizontal: 5, justifyContent: 'center' }}>
                      <Icon style={{ color: 'white', marginRight: 5 }} name='book-reader' />
                      <Text style={{ color: 'white' }}>Loans</Text>
                    </Button>
                  </View>} />
              }

              {!loanLoading && loanedBook.length !== 0 && onLoan &&
                <FlatList
                  style={{ marginBottom: 90 }}
                  keyExtractor={item => item.id}
                  data={loanData.book}
                  renderItem={({ item }) => (
                    <View style={{ flexDirection: 'row', flex: 1, height: 170, paddingHorizontal: 5, marginHorizontal: 5, paddingVertical: 9 }}>
                      <View style={{ flex: 2, backgroundColor: 'black', elevation: 8, zIndex: 1, marginRight: 10 }}>
                        <Image source={REACT_APP_URL + item.image} style={{ flex: 1, height: null, width: null, resizeMode: "cover", }} alt='loaned-books' />
                      </View>
                      <View style={{ flex: 4 }}>
                        <View style={{ flex: 1, flexDirection: 'column' }}>
                          <Text style={{ fontSize: 18, fontWeight: 'bold', flex: 2 }}>
                            {item.title}
                          </Text>
                          <Text style={{ flex: 2 }}>
                            {item.author}
                          </Text>
                          <View style={{ flex: 3, flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between' }}>
                            <Text style={{ fontSize: 24 }} >
                              Booked
                            </Text>
                          </View>
                        </View>
                      </View>
                    </View>
                  )} >
                  <View style={{ alignItems: 'center', flexDirection: 'row', marginVertical: 20, justifyContent: 'center' }}>
                    <Button success style={{ paddingHorizontal: 20, borderRadius: 5, width: 100, marginHorizontal: 5, justifyContent: 'center' }}>
                      <Icon style={{ color: 'white', marginRight: 5 }} name='hippo' />
                      <Text style={{ color: 'white' }}>Return</Text>
                    </Button>
                  </View>
                </FlatList>
              }

            </SafeAreaView>
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

            <SafeAreaView style={{ paddingBottom: 60 }}>
              <FlatList
                keyExtractor={item => item.fav}
                data={DATA}
                renderItem={({ item }) => (
                  <View style={{ flexDirection: 'row', flex: 1, height: 170, paddingHorizontal: 5, marginHorizontal: 5, paddingVertical: 9 }}>
                    <View style={{ flex: 2, backgroundColor: 'black', elevation: 8, zIndex: 1, marginRight: 10 }}>
                      <Image source={item.image} style={{ flex: 1, height: null, width: null, resizeMode: "cover", }} alt='loaned-books' />
                    </View>
                    <View style={{ flex: 4 }}>
                      <View style={{ flex: 1, flexDirection: 'column' }}>
                        <Text style={{ fontSize: 18, fontWeight: 'bold', flex: 2 }}>
                          {item.title}
                        </Text>
                        <Text style={{ flex: 2 }}>
                          {item.author}
                        </Text>
                        <View style={{ flex: 3, flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'flex-end' }}>
                          <Text >
                            Loaned: {item.fav} Times
                            </Text>
                        </View>
                      </View>
                    </View>
                  </View>
                )} />
            </SafeAreaView>
          </Tab>
        </Tabs>
        {console.log(loans)}
        {console.log(loanedBook)}
      </Container >
    );
  }
}



const mapStateToProps = (state) => ({
  auth: state.auth,
  loan: state.loan
})

const mapDispatchToProps = { deleteAllBook, deleteLoanedBook }


export default connect(mapStateToProps, mapDispatchToProps)(Loans);
