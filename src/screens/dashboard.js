import React, { Component } from 'react';
import {
  Image, StyleSheet, View, SafeAreaView, ScrollView, FlatList, Dimensions
} from 'react-native'
import {
  Container, Title, Content, Text, Icon
} from 'native-base';


import { connect } from 'react-redux'
import { getBook } from '../redux/action/book'

import Books from './components/books';
import Header from './components/header';

const deviceWidth = Dimensions.get('screen').width
const deviceHeight = Dimensions.get('screen').height

class Home extends Component {

  componentDidMount() {
    const { userData } = this.props.auth
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
  }

  render() {

    console.log(this.props)
    const { navigation } = this.props
    const { isLoading: bookLoad, books } = this.props.book
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
          <SafeAreaView style={{ flex: 1 }} >
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
              <View style={{ marginTop: 10, borderBottomColor: 'grey', borderBottomWidth: 1 }}>
                <View style={{ alignItems: "flex-end", marginHorizontal: 5, justifyContent: 'space-between', flexDirection: 'row', marginTop: 20, paddingBottom: 10 }}>
                  <Text style={{ fontSize: 30, color: '#53b4b4', fontWeight: 'bold' }}>Our Collection</Text>
                  <Text style={{ fontSize: 16, color: '#01bdbd' }}>View All</Text>
                </View>
                <View style={{ height: 210, marginTop: 20 }}>

                  {!bookLoad && books.length === 0 &&
                    <View>
                      <Text>Fetch Error</Text>
                    </View>
                  }
                  {!bookLoad && books.length !== 0 &&
                    <FlatList
                      horizontal={true}
                      showsHorizontalScrollIndicator={false}
                      keyExtractor={books => books.id.toString()}
                      data={books}
                      renderItem={book =>
                        <Books getBook={book['item']} detail={() => navigation.navigate('Detail', book['item'])} />
                      }
                    />
                  }
                  {/* <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                    {DATA.map(book => (
                      
                        <Books imageUri={book.image} />
                      
                    ))}
                  </ScrollView> */}
                </View>
              </View>

            </ScrollView>
          </SafeAreaView>
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  book: state.book,
  loan: state.loan
})

const mapDispatchToProps = { getBook }

export default connect(mapStateToProps, mapDispatchToProps)(Home)