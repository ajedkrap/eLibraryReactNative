import React, { Component } from 'react';

import Home from './src/screens/home'
import Login from './src/screens/login'
import SignUp from './src/screens/signUp'

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      // <Home />
      // <Login />
      <SignUp />
    );
  }
}
