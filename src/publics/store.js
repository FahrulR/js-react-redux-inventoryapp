import {createStore, applyMiddleware, compose} from 'redux'
import {createLogger} from 'redux-logger'
import Rpm from 'redux-promise-middleware'

import reducer from './reducers/index'

const logger = createLogger()

const store = createStore(
    reducer,
    compose( 
    applyMiddleware(logger, Rpm),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
)

export default store