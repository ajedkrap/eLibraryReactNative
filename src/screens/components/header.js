import React, { Component } from 'react';
import {
  StyleSheet, Image
} from 'react-native'
import {
  Header, Left, Right, Icon, Button
} from 'native-base'


import logo from '../../assets/e-Library-mantap.png'

export default class Headers extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Header style={{ backgroundColor: 'white', height: 70, }} >
        <Left style={{ alignItems: 'center', flex: 3 }}>
          <Image style={dashboard.logo} source={logo} />
        </Left>
        <Right style={{ flex: 1 }} />
      </Header>
    );
  }
}


const dashboard = StyleSheet.create({
  logo: {
    width: '60%',
    height: '70%',
    resizeMode: 'contain',
  }
})