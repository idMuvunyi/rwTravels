import { createStore, applyMiddleware, compose } from 'redux'
//import { composeWithDevTools } from 'redux-devtools-extension'
import { reducer } from './reducer'


const store = createStore(reducer, compose(
    applyMiddleware()
)
)

export { store }