import React, { Component } from 'react';
import {
  View, Image, Dimensions, TouchableOpacity, Text,
  SafeAreaView, ScrollView, Alert
} from 'react-native'
import {
  Container, Content, Fab, Icon, Button, Badge
} from 'native-base'

import { REACT_APP_URL } from '../../env'

import Icon2 from 'react-native-vector-icons/FontAwesome5'

const deviceWidth = Dimensions.get('window').width
const deviceHeight = Dimensions.get('screen').height

import { connect } from 'react-redux'
import { addLoanedBook } from '../redux/action/loan'

import Genre from './components/genre'

// import Footer from '../screens/components/footer'
// import Header from '../screens/components/header'

class Detail extends Component {

  addLoan = (book) => {
    const { auth, loan, navigation } = this.props
    const { isAdmin, userData } = auth
    const { id: userId } = userData
    const { onLoan } = loan
    if (!onLoan) {
      // const getLoan = loans.filter(loan => loan.id === userId)[0]
      // const { loanedBook } = getLoan
      // loanedBook.push(book)
      // loans.map(loan => {
      //   if (loan.id === userId) {
      //     loan = getLoan
      //   }
      //   return loan
      // })
      // console.log(loans)
      this.props.addLoanedBook(book, userId)
      navigation.navigate('loans')
    } else {
      Alert.alert('You are in Loan')
      navigation.navigate('loans')
    }
  }

  render() {
    console.log(this.props)
    const book = this.props.route.params
    const { id, title, image, author, status, description, genre, release_date } = book
    const getImage = {
      uri: REACT_APP_URL + image
    }
    const addBook = { id, title, image, author, status, description, genre, release_date }

    return (
      <Container style={{ width: deviceWidth }}>
        {/* <Header /> */}
        <View style={{ flex: 1, position: 'absolute' }}>

          <Fab
            position='topLeft'
            style={{ zIndex: 1, backgroundColor: '#2fa9e2' }}
            onPress={() => this.props.navigation.goBack()}
          >
            <Icon name='angle-left' type='FontAwesome5' />
          </Fab>
        </View>
        <SafeAreaView  >
          <ScrollView >

            <Container style={{ marginBottom: 120 }}>
              <View style={{ flex: 6, marginBottom: 60 }}>
                <View style={{ flex: 3, backgroundColor: '#a3e2ff', elevation: 5, }}>
                  <View style={{ flex: 1, zIndex: 0, flexDirection: 'column', opacity: 0.6 }} >
                    <Image style={{ flex: 1, height: null, width: null, resizeMode: "cover" }} blurRadius={0.50} source={getImage} alt='book-bg' />
                  </View>
                </View>
                <View style={{ flex: 2, flexDirection: 'row', justifyContent: 'center' }}>
                  <View style={{ height: 200, width: 140, zIndex: 2, position: 'absolute', backgroundColor: '#94d5db', elevation: 11, borderColor: 'white', borderWidth: 5, borderRadius: 12, marginTop: -50 }}>
                    <Image style={{ flex: 1, height: null, width: null, resizeMode: 'cover', borderRadius: 8 }} blurRadius={0.50} source={getImage} alt='book-bg' />
                  </View>
                </View>
              </View>

              <View style={{ flex: 7, paddingHorizontal: 5 }}>
                <View style={{}}>
                  <View>
                    <View style={{ alignItems: 'center', marginTop: 10 }}>
                      <Text style={{ display: 'flex', flexWrap: 'wrap', textAlign: 'center', fontSize: 28, fontWeight: 'bold' }}>
                        {title}
                      </Text>
                    </View>
                    <View style={{ display: 'flex', flexWrap: 'wrap', paddingVertical: 5, flexDirection: 'row', justifyContent: 'center', }}>
                      {/* {genre.map(genre )} */}
                      <Genre name='comedy' />

                    </View>
                    <Text style={{ textAlign: 'center' }}>By {author}</Text>
                    <View style={{ marginVertical: 20, marginHorizontal: 80, }} >
                      <Button style={{ height: 50, borderRadius: 10, elevation: 2, backgroundColor: '#12e4c3', justifyContent: 'center' }}
                        onPress={() => this.addLoan(addBook)}>
                        <Icon2 style={{ fontSize: 18, marginRight: 10 }} name='book-reader' color='white' />
                        <Text style={{ color: 'white', fontSize: 20 }}>Borrow</Text>
                      </Button>
                      <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                        <Text  >Status :
                      </Text>
                        {status === 'Available' ?
                          <Text style={{ marginLeft: 5, color: 'green' }}>{status}</Text> :
                          <Text style={{ marginLeft: 5, color: 'red' }}>{status}</Text>
                        }
                      </View>
                    </View>
                    <Text>
                      {description}
                    </Text>
                  </View>


                </View>
              </View>




            </Container>
          </ScrollView>
        </SafeAreaView>
        {/* <Footer /> */}
      </Container >
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  loan: state.loan
})

const mapDispatchToProps = { addLoanedBook }

export default connect(mapStateToProps, mapDispatchToProps)(Detail)