import React, { Component } from 'react';

import { View, Image, TouchableOpacity } from 'react-native';
import { REACT_APP_URL } from '../../../env'

class Books extends Component {

  render() {
    const { image } = this.props.getBook
    const getImage = `${REACT_APP_URL}${image}`
    return (
      <TouchableOpacity onPress={this.props.detail}>
        <View style={{ height: 190, width: 120, marginHorizontal: 5, zIndex: 2, elevation: 5, backgroundColor: 'black', margintTop: 5, marginBottom: 5 }}>
          <Image source={{
            uri: getImage
          }} style={{ flex: 1, height: null, width: null, resizeMode: "cover", }} alt='images' />
        </View>
      </TouchableOpacity>
    );
  }
}

export default Books;
