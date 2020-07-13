import React from 'react';
import {
  View, Text, KeyboardAvoidingView, Alert
} from 'react-native'
import { Container, Content, Form, Item, Input, Label, Button } from 'native-base';
import ImagePicker from 'react-native-image-picker'
import moment from 'moment'

import Header from './components/header';

import { connect } from 'react-redux'
import { clearMessage, addBook } from '../redux/action/book'
import Icon from 'react-native-vector-icons/FontAwesome5';

import { ScrollView } from 'react-native-gesture-handler';

class addBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      description: '',
      genre: '',
      author: '',
      image: null,
      releaseDate: ''
    }
  }


  handleChange = (text, state) => {
    this.setState({ [state]: text })
  }

  handleChoosePhoto = () => {
    const options = {
      noData: true
    }
    ImagePicker.launchImageLibrary(options, response => {
      console.log('response', response)
      if (response.uri) {
        this.setState({ image: response })
      }
    })
  }

  createBook = () => {
    const { userData } = this.props.auth
    const { token } = userData
    const { image, title, description, genre, author, releaseDate } = this.state
    const data = new FormData()
    data.append('image', {
      uri: image.uri,
      type: image.type,
      name: image.fileName,
    })
    data.append('description', description)
    data.append('title', title)
    data.append('genre', genre)
    data.append('author', author)
    data.append('release_date', releaseDate)
    this.props.addBook(token, data)
  }

  componentDidMount() {
    this.props.clearMessage()
  }

  componentDidUpdate() {
    const { message, isError } = this.props.book
    if (message !== null) {
      if (isError) {
        Alert.alert(
          'Create Book Failed',
          message
        )
      }
      else {
        Alert.alert(
          'Create Book Success',
          message
        )
      }
      this.props.clearMessage()
    }
  }

  render() {

    return (

      <KeyboardAvoidingView style={{ flex: 1 }}>
        <Header />
        <Content >
          <ScrollView>
            <View style={{ alignItems: 'center', marginVertical: 15 }}>
              <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Add Book</Text>
            </View>
            <Form style={{ margin: 10, marginVertical: 15 }}>
              <Item stackedLabel>
                <Label>Title</Label>
                <Input onChangeText={text => this.handleChange(text, 'title')} />
              </Item>
              <Item stackedLabel>
                <Label>Description</Label>
                <Input numberOfLines={5} multiline={true} onChangeText={text => this.handleChange(text, 'description')} />
              </Item>
              <Item stackedLabel>
                <Label>Genre</Label>
                <Input onChangeText={text => this.handleChange(text, 'genre')} />
              </Item>
              <Item stackedLabel>
                <Label>Author</Label>
                <Input onChangeText={text => this.handleChange(text, 'author')} />
              </Item>
              <Item stackedLabel>
                <Label>Release Date</Label>
                <Input onChangeText={text => this.handleChange(text, 'releaseDate')} />
              </Item>
              {this.state.image !== null &&
                <View style={{ alignItems: "center" }}>
                  <Text>
                    File : {this.state.image.fileName}
                  </Text>
                </View>
              }
              <Button style={{ marginHorizontal: 70, marginTop: 20, justifyContent: 'center', backgroundColor: 'rgb(135,206,235)' }}
                onPress={this.handleChoosePhoto}>

                <Icon name='file-image' style={{ paddingRight: 15, color: 'white' }} />
                <Text style={{ color: 'white' }}>Select Image</Text>
              </Button>
              <Button style={{ marginHorizontal: 30, marginTop: 30, justifyContent: 'center', backgroundColor: 'rgb(135,206,235)' }}
                onPress={() => this.createBook()} >
                <Icon name='book-medical' style={{ paddingRight: 15, color: 'white' }} />
                <Text style={{ color: 'white' }}>Add Book</Text>
              </Button>
            </Form>
          </ScrollView>
        </Content>
      </KeyboardAvoidingView>


    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  book: state.book,
  genre: state.genre
})

const mapDispatchToProps = { clearMessage, addBook }

export default connect(mapStateToProps, mapDispatchToProps)(addBooks);
