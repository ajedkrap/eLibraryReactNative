import React, { Component } from 'react';
import {
  Image, StyleSheet, View, SafeAreaView, ScrollView, TouchableOpacity, FlatList
} from 'react-native'
import {
  Container, Title, Content, Text, Icon,
} from 'native-base';

import saiki from '../assets/saiki.png'
import tate from '../assets/tate.jpg'
import yoza from '../assets/yoza.jpg'
import croma from '../assets/croma.jpg'

import { connect } from 'react-redux'
import { logout } from '../redux/action/auth'
import { getBook } from '../redux/action/book'



import Books from './components/books';
import Footer from './components/footer';
import Header from './components/header';

import { TextInput } from 'react-native-gesture-handler';

class Home extends Component {

  componentDidMount() {
    const { userData } = this.props.auth
    const { token } = userData
    this.props.getBook(token)
  }

  render() {
    const { navigation } = this.props
    const { isLoading: bookLoad, isError: bookError, books } = this.props.book
    return (
      <Container>
        <Header />
        <Content padder>
          <SafeAreaView style={{ flex: 1 }} >
            <ScrollView>
              <View>
                <View style={{ alignItems: "flex-end", marginHorizontal: 5, justifyContent: 'space-between', flexDirection: 'row', marginTop: 20 }}>
                  <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Search Catalog</Text>
                  <Text style={{ fontSize: 12, color: '#01bdbd' }}>Advance Search +</Text>
                </View>
                <View style={{ flex: 1, borderColor: 'grey', borderWidth: 1, flexDirection: 'row', alignItems: 'center', marginTop: 20 }}>
                  <TextInput placeholder='Search by Title' style={{ flex: 6 }} />
                  <Icon name='search' style={{ flex: 1 }} />
                </View>
              </View>
              <View style={{ marginTop: 10 }}>
                <View style={{ alignItems: "flex-end", marginHorizontal: 5, justifyContent: 'space-between', flexDirection: 'row', marginTop: 20 }}>
                  <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Our Collection</Text>
                  <Text style={{ fontSize: 12, color: '#01bdbd' }}>View All</Text>
                </View>
                <View style={{ height: 210, marginTop: 20 }}>
                  {bookLoad &&
                    <View>
                      <Text>
                        Loading
                      </Text>
                    </View>
                  }
                  {!bookLoad && typeof books === 'undefined' &&
                    <View>
                      <Text>Fetch Error</Text>
                    </View>
                  }
                  {!bookLoad && typeof books !== 'undefined' &&
                    <View>
                      <FlatList
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        keyExtractor={books => books.id.toString()}
                        data={books}
                        renderItem={book =>
                          <Books getBook={book['item']} />
                        }
                      />
                    </View>
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
  book: state.book
})

const mapDispatchToProps = { logout, getBook }

export default connect(mapStateToProps, mapDispatchToProps)(Home)