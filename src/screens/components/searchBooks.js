import React, { Component } from 'react';

import { View, Image, TouchableOpacity } from 'react-native';
import { REACT_APP_URL } from '../../../env'

class SearchBooks extends Component {

  render() {
    const { image } = this.props.getBook
    const getImage = `${REACT_APP_URL}${image}`
    return (
      <TouchableOpacity onPress={this.props.detail}>
        <View style={{ height: 170, width: 105, marginHorizontal: 5, zIndex: 2, elevation: 5, backgroundColor: 'grey', margintTop: 10, marginBottom: 10 }}>
          <Image source={{
            uri: getImage
          }} style={{ flex: 1, height: null, width: null, resizeMode: "cover", }} alt='images' />
        </View>
      </TouchableOpacity>
    );
  }
}

export default SearchBooks;
