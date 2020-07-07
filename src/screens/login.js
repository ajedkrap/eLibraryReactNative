import React, { Component } from 'react';
import {
  Container, Form, Item, Footer
} from 'native-base'
import {
  View, Dimensions, StyleSheet, Animated, UIManager,
  Keyboard, TextInput, TouchableOpacity, Image, Text,
  Alert
} from 'react-native'
import asyncStorage from '@react-native-community/async-storage'

// import LinearGradient from 'react-native-linear-gradient'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faSignInAlt, faEye, faUser, faLock, faEyeSlash } from '@fortawesome/free-solid-svg-icons'

import { connect } from 'react-redux'

import { login, clearMessage } from '../redux/action/auth'

import logo from '../assets/e-Library2.png'
import bg from '../assets/bg.png'

const deviceWidth = Dimensions.get('screen').width
const deviceHeight = Dimensions.get('screen').height

const { State: TextInputState } = TextInput

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shift: new Animated.Value(0),
      hidePassword: true,
      username: '',
      password: '',
    };
  }

  componentDidMount() {
    this.props.clearMessage()
    this.keyboardDidShowSub = Keyboard.addListener('keyboardDidShow', this.handleKeyboardDidShow);
    this.keyboardDidHideSub = Keyboard.addListener('keyboardDidHide', this.handleKeyboardDidHide);
  }

  componentWillUnmount() {
    this.keyboardDidShowSub.remove();
    this.keyboardDidHideSub.remove();
  }

  handleKeyboardDidShow = (event) => {
    const { height: windowHeight } = Dimensions.get('screen');
    const keyboardHeight = event.endCoordinates.height;
    const currentlyFocusedField = TextInputState.currentlyFocusedField();
    UIManager.measure(currentlyFocusedField, (originX, originY, width, height, pageX, pageY) => {
      const fieldHeight = height;
      const fieldTop = pageY;
      const gap = (windowHeight - keyboardHeight) - (fieldTop + fieldHeight * 3);
      if (gap >= 0) {
        return;
      }
      Animated.timing(
        this.state.shift,
        {
          toValue: gap,
          duration: 500,
          useNativeDriver: true,
        }
      ).start();
    });
  }

  handleKeyboardDidHide = () => {
    Animated.timing(
      this.state.shift,
      {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }
    ).start();
  }

  handleChange = (text, state) => {
    this.setState({ [state]: text })
  }

  login = () => {
    const { username, password } = this.state
    if (username !== '' && password !== '') {
      const data = {
        username,
        password
      }
      this.props.login(data)
    } else {
      Alert.alert(
        'Login Failed',
        'Form need to be filled'
      )
    }
  }

  componentDidUpdate() {
    const { message, isError, userData } = this.props.auth
    if (message !== null) {
      if (isError) {
        Alert.alert(
          'Login Failed',
          message
        )
      }
      else {
        Alert.alert(
          message,
          'Welcome'
        )
        console.log('wah masuk nih')
        // await asyncStorage.setItem('token', JSON.stringify(userData));
        // this.props.navigation.navigate('Main')
      }
      this.props.clearMessage()
    }
  }

  render() {
    const { shift } = this.state;
    const { navigation } = this.props
    return (
      <Animated.View style={[loginStyle.container, { transform: [{ translateY: shift }] }]}>
        <Container>

          <View style={loginStyle.bgWrapper}>
            <Image source={bg} blurRadius={2} opacity={0.8} />
          </View>
          {/* <LinearGradient useAngle={true} angle={180} angleCenter={{ x: 0.5, y: 0.5 }} colors={['#59e7f6', '#5abebe']}
            style={loginStyle.gradientWrapper} /> */}
          <View style={loginStyle.gradientWrapper} />
          <View style={loginStyle.logoWrapper}>
            <Image style={loginStyle.logo} source={logo} />
          </View>
          <View style={loginStyle.formWrapper}>
            {/* <View style={{ flexDirection: 'row', zIndex: 3, elevation: 1 }}>
              <TouchableOpacity style={loginStyle.registerButton}>
                <Text style={{ color: 'white', opacity: 1 }} >Register</Text>
              </TouchableOpacity>
              <Text style={loginStyle.loginButton}>Login</Text>
            </View> */}
            <Form style={loginStyle.form}>
              <Item style={[loginStyle.formItem]}>
                <FontAwesomeIcon icon={faUser} style={{ marginHorizontal: 10, color: 'white', flex: 2 }} />
                <TextInput style={[loginStyle.formInput, { flex: 4 }]} placeholder='Username' placeholderTextColor='#e1e3da' keyboardType='default'
                  onChangeText={text => this.handleChange(text, 'username')}
                />
              </Item>
              <Item style={loginStyle.formItem}>
                <FontAwesomeIcon icon={faLock} style={{ marginHorizontal: 10, color: 'white', flex: 2 }} />
                <TextInput id='password' style={[loginStyle.formInput, { flex: 4 }]} placeholder='Password' placeholderTextColor='#e1e3da' keyboardType='default' secureTextEntry={this.state.hidePassword}
                  onChangeText={text => this.handleChange(text, 'password')}
                />
                {this.state.hidePassword ?
                  <FontAwesomeIcon icon={faEyeSlash} onPress={() => this.setState({ hidePassword: !this.state.hidePassword })} style={{ marginHorizontal: 20, color: 'white', flex: 2 }} /> :
                  <FontAwesomeIcon icon={faEye} onPress={() => this.setState({ hidePassword: !this.state.hidePassword })} style={{ marginHorizontal: 20, color: 'white', flex: 2 }} />}
              </Item>
              <TouchableOpacity
                style={loginStyle.formButton}
                onPress={this.login} >
                <FontAwesomeIcon style={{ marginRight: 10, }} color='white' icon={faSignInAlt} />
                <Text style={loginStyle.buttonText} >
                  Login
                </Text>
              </TouchableOpacity>
              <View style={{ marginVertical: 5, alignItems: 'center' }}>
                <Text style={{ color: 'white' }} >Forgot Password?</Text>
              </View>
            </Form>

          </View>
          <View style={{ zIndex: 2, bottom: 45, alignItems: "center", width: deviceWidth, position: 'absolute', flexDirection: 'row', justifyContent: "center" }}>
            <Text style={{ color: 'white' }}>New Member?&nbsp;&nbsp;</Text>
            <Text style={{ color: '#4bf1f1', textDecorationLine: 'underline' }}
              onPress={() => navigation.navigate('Signup')}
            >
              Just Register</Text>
          </View>
        </Container>
      </Animated.View>
    );
  }
}


const mapStateToProps = state => ({
  auth: state.auth
})

const mapDispatchToProps = { login, clearMessage }

export default connect(mapStateToProps, mapDispatchToProps)(Login);




const loginStyle = StyleSheet.create({
  container: {
    flex: 1,
    height: deviceHeight,
    justifyContent: 'space-around',
    left: 0,
    position: 'absolute',
    top: 0,
    width: deviceWidth
  },
  registerButton: {
    alignItems: 'center',
    paddingVertical: 10,
    flex: 1,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    backgroundColor: 'rgba(255,255,255,0.5)',
    borderColor: 'white',
    borderBottomColor: 'transparent',
    borderWidth: 1,
    marginBottom: -2,
    zIndex: 5,
    color: 'white'
  },
  loginButton: {
    textAlign: 'center',
    paddingVertical: 10,
    flex: 1,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    backgroundColor: 'rgba(255,255,255,0.5)',
    borderColor: 'white',
    borderWidth: 1,
    marginBottom: -2,
    zIndex: 4,
    color: 'white'
  },
  bgWrapper: {
    position: "absolute",
    flex: 1,
    zIndex: 0,
    alignSelf: 'center',
    resizeMode: 'cover',
  },
  gradientWrapper: {
    backgroundColor: 'black',
    flex: 1,
    opacity: 0.4,
    zIndex: 1
  },
  logoWrapper: {
    alignItems: "center",
    justifyContent: 'center',
    position: 'absolute',
    marginTop: 60,
    height: 60,
    width: deviceWidth,
    elevation: 1,
    zIndex: 2,
  },
  logo: {
    width: '70%',
    height: '80%',
    resizeMode: 'contain',
  },
  formWrapper: {
    height: deviceHeight,
    width: deviceWidth,
    marginTop: 30,
    paddingLeft: 20,
    paddingRight: 20,
    flexDirection: 'column',
    justifyContent: 'center',
    position: 'absolute',
    zIndex: 2,

  },
  form: {
    paddingTop: 10,
    borderTopColor: 'transparent',
    // borderColor: 'grey',
    borderWidth: 0,
    justifyContent: 'center',
    height: 280,
    color: 'white',
    elevation: 0,
  },
  formItem: {
    backgroundColor: 'rgba(255,255,255,0.5)',
    justifyContent: "flex-start",
    width: deviceWidth - 70,
    color: 'white',
    paddingTop: 5,
    alignItems: 'center',
    marginBottom: 10,
    elevation: 2
  },
  formInput: {
    fontSize: 16,
    color: 'white',
    width: 180,
    height: 40,
  },
  formButton: {
    backgroundColor: '#4bf1f1',
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 20,
    flexDirection: 'row',
    borderRadius: 5,
    elevation: 0,
    marginHorizontal: 15,
    paddingTop: 10,
    paddingBottom: 10,
  },
  buttonText: {
    fontSize: 16,
    color: 'white'
  }
})
