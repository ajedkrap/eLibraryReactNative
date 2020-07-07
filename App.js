import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'
import getStore from './src/redux/store';

import Stack from './src/screens/components/stack'

class App extends Component {
  render() {
    return (
      <Provider store={getStore.store}>
        <NavigationContainer>
          <PersistGate persistor={getStore.persistor} >
            <Stack />
          </PersistGate>
        </NavigationContainer>
      </Provider>
    );
  }
}


export default App
