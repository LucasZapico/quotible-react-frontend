import React from 'react'
import ReactDOM from 'react-dom'
import './assets/sass/index.scss'
import App from './App'
import * as serviceWorker from './serviceWorker'
import {
  QuotesProvider,
  EditProvider,
  AuthProvider,
} from './context/index'

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <QuotesProvider>
        <EditProvider>
          <App />
        </EditProvider>
      </QuotesProvider>
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
