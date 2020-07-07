import { createStore, applyMiddleware } from 'redux'
import logger from 'redux-logger'
import { persistStore } from 'redux-persist'
import promiseMiddleware from 'redux-promise-middleware'
import rootReducer from './reducer'

const store = createStore(
  rootReducer,
  applyMiddleware(
    promiseMiddleware,
    logger
  )
)

const persistor = persistStore(store)

export default { store, persistor }