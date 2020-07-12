import React from 'react';

import {
  Text, View, TouchableOpacity, Modal, StyleSheet, Dimensions, FlatList
} from 'react-native'

import {
  Container, Header, Content, Item, Input, Button, Picker, Text as NBText
} from 'native-base'

import Icon from 'react-native-vector-icons/FontAwesome5'
import Books from './components/searchBooks'

import saiki from '../assets/saiki.png'
import tate from '../assets/tate.jpg'
import yoza from '../assets/yoza.jpg'
import croma from '../assets/croma.jpg'

import { connect } from 'react-redux'
import { searchBook } from '../redux/action/book'
import { getGenre } from '../redux/action/genre'
import SearchBooks from './components/searchBooks';

const deviceWidth = Dimensions.get('screen').width
const deviceHeight = Dimensions.get('screen').height


class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      currentPage: 1,
      sort: 0,
      genre: '',
      param: {},
      books: [],
      loadingMore: false
    };
  }

  setModalVisible() {
    this.setState({ modalVisible: !this.state.modalVisible })
  }

  searchBook = (text) => {

  }

  // searchBook = (genre = null) => {
  //   const { param } = this.state
  //   const { userData } = this.props.auth
  //   const { token } = userData
  //   if (this.state.genre !== '') {
  //     this.props.searchBook(token, param, genre)

  //   } else {
  //     this.setState({ genre: '' })
  //     this.props.searchBook(token, { ...param })
  //   }
  // }

  searchBookByGenre = (genre) => {
    console.log(this.state)
    this.setState({ genre })
    const { userData } = this.props.auth
    const { token } = userData
    this.props.searchBook(token, null, genre)
    this.setModalVisible()
  }

  // refreshBook = (params) => {
  //   console.log('refresh')
  //   const { searchBooks } = this.props.book
  //   searchBooks.length = 0
  //   this.setState({ books: [] })
  //   const { genre } = this.state
  //   params.page = 1
  //   this.searchBook({ ...params }, genre)
  // }

  componentDidUpdate() {
    console.log(this.state)
    // const { param } = this.state
    // param.page = param.page++
    // this.props.searchBook(token, param)

  }

  componentDidMount() {
    const { userData } = this.props.auth
    const { token } = userData
    const { param } = this.state
    this.props.getGenre(token)
    this.props.searchBook(token, param)
  }



  render() {
    const { navigation, auth, book } = this.props
    const { param, sort } = this.state
    param.page = param.page || param
    param.search = param.search || ''
    param.sort = param.sort || 0

    const { books, genre: thisGenre } = this.state
    const { userData } = auth
    const { token } = userData
    const { isLoading: bookLoading, searchBooks, searchPage } = book
    const { totalPage } = searchPage
    const { genres } = this.props.genre
    books.push(...searchBooks)

    return (
      <Container>
        {bookLoading &&
          <View style={{ position: 'absolute', height: deviceHeight, width: deviceWidth, backgroundColor: 'rgba(200,200,200,0.25)', flex: 1, alignItems: 'center', justifyContent: 'center', zIndex: 30 }}>
            <Text>
              Loading
            </Text>
          </View>
        }
        <Header searchBar rounded style={{ backgroundColor: '#4bf1f1' }}>
          <Item>
            <Icon name="search" style={{ paddingHorizontal: 10, fontSize: 18, color: 'grey' }} />
            <Input placeholder="Search" onChangeText={text => this.props.searchBook(token, { ...param, search: text })} />
          </Item>
          <Button transparent>
            <NBText>Search</NBText>
          </Button>
        </Header>
        <View style={{ flex: 1 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'center', marginVertical: 10, }}>
            <TouchableOpacity style={{ flex: 5, marginHorizontal: 10, paddingVertical: 10, paddingHorizontal: 20, backgroundColor: 'transparent', borderColor: '#4bf1f1', borderWidth: 2, borderRadius: 5, alignItems: "center", justifyContent: 'space-between', flexDirection: 'row' }}
              onPress={() => this.setModalVisible()}>
              <Text style={{ fontSize: 18, color: '#53b4b4', textTransform: 'capitalize' }} ellipsizeMode='tail' numberOfLines={1}>
                {thisGenre ? thisGenre : 'genre'}
              </Text>
              <Icon style={{ fontSize: 18, paddingLeft: 5, color: '#53b4b4' }} name="caret-down" />
            </TouchableOpacity>
            <TouchableOpacity style={{ flex: 1, marginHorizontal: 10, paddingVertical: 10, paddingHorizontal: 20, backgroundColor: 'transparent', borderColor: '#4bf1f1', borderWidth: 2, borderRadius: 5, alignItems: "center", justifyContent: 'center', flexDirection: 'row' }}>
              {param.sort ?
                <Icon name='sort-alpha-down' style={{ fontSize: 24, color: '#53b4b4' }} onPress={() => this.props.searchBook(token, { ...param, sort: 0 })} /> :
                <Icon name='sort-alpha-up' style={{ fontSize: 24, color: '#53b4b4' }} onPress={() => this.props.searchBook(token, { ...param, sort: 1 })} />
              }
            </TouchableOpacity>
          </View>
          {searchBooks.length === 0 &&
            <View style={{ alignItems: 'center' }}>
              <Text>No data</Text>
            </View>
          }
          {searchBooks.length !== 0 &&
            // onRefresh={() => this.searchBook({ ...params, page: 1 })}
            // onEndReached={() => this.nextPage({ ...params, page: page++ })}
            <FlatList
              numColumns={3}
              style={{ alignSelf: 'center' }}
              keyExtractor={(book, index) => book.id.toString() + index}
              data={searchBooks}
              refreshing={bookLoading}
              onEndReached={param.page <= totalPage ? this.props.searchBook(token, { ...param, page: param.page + 1 }) : null}
              onEndReachedThreshold={0.5}
              renderItem={(book) =>
                <SearchBooks getBook={book['item']} detail={() => navigation.navigate('Detail', book['item'])} />
              }
            />}

        </View>
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
          }}
        >
          <View style={styles.bottomView}>
            <View style={styles.modalView}>

              <FlatList
                keyExtractor={genre => genre.id.toString()}
                ListHeaderComponent={
                  <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                    <TouchableOpacity onPress={() => this.props.searchBook(token, { ...param })}>
                      <View style={{ height: 40, borderWidth: 1, borderTopColor: 'grey', borderBottomColor: 'grey' }}>
                        <Text>
                          All Genre
                      </Text>
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.setModalVisible()}>
                      <View style={{ height: 40, borderWidth: 1, borderTopColor: 'grey', borderBottomColor: 'grey' }}>
                        <Text>
                          Cancel
                      </Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                }
                data={genres}
                renderItem={({ item }) =>
                  <TouchableOpacity onPress={() => this.searchBookByGenre(item.genre)}>
                    <View style={{ height: 40, width: deviceWidth - 80, borderWidth: 1, borderTopColor: 'grey', borderBottomColor: 'grey' }}>
                      <Text>
                        {item.genre}
                      </Text>
                    </View>
                  </TouchableOpacity>
                }
              />
              {/* <TouchableOpacity
                style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
                onPress={() => this.setModalVisible()}
              >
                <Text style={styles.textStyle}>Hide Modal</Text>
              </TouchableOpacity> */}
            </View>
          </View>
        </Modal>
      </Container >
    );
  }
}

const mapStatetoProps = (state) => ({
  book: state.book,
  genre: state.genre,
  auth: state.auth
})

const mapDispatchToProps = { searchBook, getGenre }


export default connect(mapStatetoProps, mapDispatchToProps)(Search);

const styles = StyleSheet.create({
  bottomView: {
    backgroundColor: 'rgba(0,0,0,0.25)',
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  modalView: {
    // margin: 20,
    backgroundColor: 'black',
    width: deviceWidth,
    height: 400,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 20
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "left"
  }
});