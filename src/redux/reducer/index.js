import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'
import AsyncStorage from '@react-native-community/async-storage';

import auth from './auth'
import book from './book'

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['auth', 'book']
}

const rootReducer = combineReducers({
  auth,
  book
})

export default persistReducer(persistConfig, rootReducer)