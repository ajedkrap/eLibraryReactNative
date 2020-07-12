import React, { Component } from 'react';
import {
  StyleSheet, Image, View, Dimensions
} from 'react-native'
import {
  Header, Left, Right, Button
} from 'native-base'

import Icon from 'react-native-vector-icons/FontAwesome5'

import logo from '../../assets/e-Library-bw.png'

export default class Headers extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Header style={{ backgroundColor: 'rgba(135,206,235, 0.55)', height: 70, justifyContent: 'center' }} >

        <Left style={{ alignItems: 'flex-start', flex: 2, paddingLeft: 10, margin: 0, padding: 0 }}>
          <Image style={dashboard.logo} source={logo} />
        </Left>
        <Right style={{ flex: 1, paddingRight: 10 }}>
          <Icon name='search' style={{ fontSize: 18 }} onPress={this.props.goToSearch} />
        </Right>

      </Header>
    );
  }
}


const dashboard = StyleSheet.create({
  logo: {
    width: '60%',
    height: '70%',
    padding: 0,
    margin: 0,
    resizeMode: 'contain',
  }
})