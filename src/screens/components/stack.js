import React, { Component } from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import Login from '../login'
import SignUp from '../signUp'
import Detail from '../detail'
import AddBook from '../addBook'

import Tab from './tabs'

import { connect } from 'react-redux'

const Stack = createStackNavigator();
const config = {
  animation: 'spring',
  config: {
    stiffness: 1000,
    damping: 500,
    mass: 3,
    overshootClamping: true,
    restDisplacementThreshold: 0.01,
    restSpeedThreshold: 0.01,
  },
};

class Stacks extends Component {

  render() {
    const { isLogin } = this.props.auth
    return (
      <Stack.Navigator headerMode='none'>
        {!isLogin && (<>
          <Stack.Screen
            name='Login'
            component={Login}
            options={{
              transitionSpec: {
                open: config,
                close: config,
              },
            }}
          />
          <Stack.Screen
            name='Signup'
            component={SignUp}
            options={{
              transitionSpec: {
                open: config,
                close: config,
              },
            }}
          />
        </>)}
        {isLogin && (
          <>
            <Stack.Screen
              name='Main'
              component={Tab}
            />
            <Stack.Screen
              component={Detail}
              name='Detail'
            />
            <Stack.Screen

              component={AddBook}
              name='AddBook'
            />
          </>
        )}
      </Stack.Navigator>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth
})


export default connect(mapStateToProps, null)(Stacks);
