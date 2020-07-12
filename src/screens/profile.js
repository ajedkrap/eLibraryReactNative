import React, { Component } from 'react';
import {
  Text, Dimensions, View, Image, TextInput, SafeAreaView, ScrollView
} from 'react-native'
import {
  Container, Content, Button, Label, Item
} from 'native-base'

import LinearGradient from 'react-native-linear-gradient'
import profile from '../assets/profile.jpg'
import Icon from 'react-native-vector-icons/FontAwesome5'

import { connect } from 'react-redux'
import { logout } from '../redux/action/auth'

// import Footer from '../screens/components/footer'
// import Header from '../screens/components/header'
const deviceWidth = Dimensions.get('screen').width
const deviceHeight = Dimensions.get('screen').height

class Loans extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  goToLogout = () => {
    this.props.logout()
  }

  render() {
    const { userData } = this.props.auth
    const { username, email } = userData
    return (
      <Container>
        <View style={{ flex: 3, justifyContent: 'center' }}>
          <View style={{ flex: 1, zIndex: 0 }}>
            <LinearGradient useAngle={true} angle={180} angleCenter={{ x: 0.75, y: 0.25 }} colors={['#ffffff', '#53b4b4']}
              style={{ flex: 1, opacity: 0.8, zIndex: 0, borderBottomRightRadius: 12, borderBottomLeftRadius: 12, elevation: 5, backgroundColor: 'white' }} />
          </View>
          <View style={{ flex: 1, position: 'absolute', flexDirection: 'row', zIndex: 0 }}>
            <View style={{ flex: 2, alignItems: 'center', justifyContent: 'center' }}>
              <View style={{ height: 100, width: 100, borderRadius: 50, backgroundColor: 'black', elevation: 10 }}>
                <Image style={{ flex: 1, height: null, width: null, resizeMode: 'contain', borderRadius: 50, }} source={profile} />
              </View>

            </View>
            <View style={{ flex: 3, flexDirection: 'column' }}>
              <View style={{ flex: 1, justifyContent: 'flex-end', paddingVertical: 5 }}>
                <Text style={{ fontSize: 24, fontWeight: 'bold' }}>
                  {typeof username !== 'undefined' ? username : 'User'}
                </Text>
              </View>
              <View style={{ flex: 1, paddingVertical: 5 }}>
                <Text>
                  {typeof email !== 'undefined' ? email : 'Email'}
                </Text>
                <Text style={{ color: 'white', textDecorationLine: 'underline' }}>
                  Change Password
                </Text>
              </View>
            </View>
          </View>
        </View>
        <View style={{ flex: 5, alignItems: 'center' }}>

          <View style={{ flex: 1, position: 'absolute', flexDirection: 'column', zIndex: 1, width: deviceWidth - 70, marginTop: -25 }}>

            <View style={{ flex: 5, backgroundColor: 'white', elevation: 5, paddingTop: 20, marginBottom: 10, borderRadius: 15, }}>
              <Item style={{ flexDirection: 'column', marginLeft: 25, marginRight: 25 }}>
                <Label style={{ alignSelf: 'flex-start', fontSize: 16, color: 'grey', opacity: 0.4 }}>Mobile</Label>
                <Text style={{ fontSize: 20, }}>0818181818181</Text>
              </Item>
              <Item style={{ flexDirection: 'column', marginLeft: 25, marginRight: 25 }}>
                <Label style={{ alignSelf: 'flex-start', fontSize: 16, color: 'grey', opacity: 0.4 }}>Motto</Label>
                <Text style={{ fontSize: 20, }}>Yamaha Mio</Text>
              </Item>
              <Item style={{ flexDirection: 'column', marginLeft: 25, marginRight: 25 }}>
                <Label style={{ alignSelf: 'flex-start', fontSize: 16, color: 'grey', opacity: 0.4 }}>Spirit Animal</Label>
                <Text style={{ fontSize: 20, }}>Iron Man</Text>
              </Item>

              <Button style={{ borderBottomLeftRadius: 15, borderBottomRightRadius: 15, justifyContent: "center", backgroundColor: '#15ccdf' }}>
                <Text style={{ color: 'white', marginRight: 20 }}>Change Info</Text>
                <Icon name='edit' color='white' />
              </Button>
            </View>
            <View style={{ flex: 3, backgroundColor: 'white', elevation: 5, paddingTop: 20, paddingBottom: 10, borderRadius: 15 }}>
              <Item style={{ flexDirection: 'column', marginLeft: 20, marginRight: 20, paddingVertical: 8 }}>
                <Text style={{ fontSize: 16, }}>Contact Us</Text>
              </Item>
              <Item onPress={this.goToLogout}
                style={{ flexDirection: 'column', marginLeft: 20, marginRight: 20, paddingVertical: 8 }}>
                <Text style={{ fontSize: 16, color: 'red' }}>Log Out</Text>
              </Item>
            </View>

          </View>
        </View>
      </Container >
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
})

const mapDispatchToProps = { logout }

export default connect(mapStateToProps, mapDispatchToProps)(Loans);
