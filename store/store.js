import { createStore, compose } from 'redux'
import { reducer } from './reducer'

let composeEnhancers = compose;
if (__DEV__) {
    composeEnhancers = window.__REDUX_DEVTOOLS_COMPOSE__ || compose
}

const store = createStore(reducer, composeEnhancers())

export { store }