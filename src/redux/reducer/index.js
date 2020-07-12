import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'
import AsyncStorage from '@react-native-community/async-storage';

import auth from './auth'
import book from './book'
import loan from './loan'
import genre from './genre'

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: [],
  blacklist: ['book', 'genre'],
}

const rootReducer = combineReducers({
  auth,
  loan,
  book,
  genre
})

export default persistReducer(persistConfig, rootReducer)