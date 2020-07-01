import React, { Component } from 'react';
import {
  Container, Form, Item,
} from 'native-base'
import {
  View, Dimensions, StyleSheet, Animated, UIManager, Keyboard, TextInput, Text, Image
} from 'react-native'

import logo from '../assets/e-Library.png'
import bg from '../assets/bg.png'

const deviceWidth = Dimensions.get('screen').width
const deviceHeight = Dimensions.get('screen').height

const { State: TextInputState } = TextInput

export default class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shift: new Animated.Value(0)
    };
  }


  componentDidMount() {
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

  render() {
    const { shift } = this.state;
    return (
      <Animated.View style={[loginStyle.container, { transform: [{ translateY: shift }] }]}>
        <Container>

          <View style={loginStyle.bgWrapper}>
            <Image style={loginStyle.bg} source={bg} />
          </View>
          <View style={loginStyle.logoWrapper}>
            <Image style={loginStyle.logo} source={logo} />
          </View>
          <View style={loginStyle.formWrapper}>
            <Form style={loginStyle.form}>
              <Item style={loginStyle.formItem}>
                <Text style={loginStyle.formText}>Email</Text>
                <TextInput style={loginStyle.formInput} keyboardType='email-address' />
              </Item>
              <Item style={loginStyle.formItem}>
                <Text style={loginStyle.formText}>Password</Text>
                <TextInput style={loginStyle.formInput} keyboardType='default' secureTextEntry={true} />
              </Item>
            </Form>
          </View>
        </Container>
      </Animated.View>
    );
  }
}




const loginStyle = StyleSheet.create({
  container: {
    backgroundColor: 'gray',
    flex: 1,
    height: deviceHeight,
    justifyContent: 'space-around',
    left: 0,
    position: 'absolute',
    top: 0,
    width: deviceWidth
  },
  bgWrapper: {
    height: deviceHeight,
    width: deviceWidth,
  },
  bg: {
    zIndex: 0
  },
  logoWrapper: {
    paddingLeft: 20,
    justifyContent: 'flex-end',
    position: 'absolute',
    marginTop: 40,
    height: 60,
    width: deviceWidth,
    backgroundColor: 'white',
    elevation: 1,
    zIndex: 1,
  },
  logo: {
    width: '50%',
    height: '60%',
    resizeMode: 'contain',
  },
  formWrapper: {
    height: deviceHeight,
    width: deviceWidth,
    paddingLeft: 30,
    paddingRight: 30,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    paddingBottom: 120,
    position: 'absolute',
    elevation: 1,
    zIndex: 1
  },
  form: {
    paddingTop: 20,
    borderRadius: 20,
    height: 200,
    backgroundColor: 'white',
    elevation: 2,
  },
  formItem: {
    paddingTop: 5,
    alignItems: 'flex-start',
    flexDirection: 'column',
    marginLeft: 30,
    marginRight: 30
  },
  fontText: {
    width: 180,
    fontSize: 12,
    height: 50,
  },
  formInput: {
    width: 180,
    height: 30,
    padding: 0
  }
})
