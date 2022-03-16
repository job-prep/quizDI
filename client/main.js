import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { store } from './redux/store.js'


ReactDOM.render(
    <Provider store = {store}>
        <h1>Hello World</h1>
    </Provider>,
    document.getElementById('root')
);