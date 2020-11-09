import React, { useState, useEffect } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useHistory,
  useLocation,
} from 'react-router-dom'
import * as ROUTES from './constants/routes.js'
import './assets/sass/index.scss'
import HomeAuthPage from './components/pages/HomeAuth'
import HomeNonAuthPage from './components/pages/HomeNonAuth'
import Navigation from './components/Navigation.js'
import StyleGuidePage from './components/pages/StyleGuide.js'
import AuthPage from './components/pages/Auth.js'
import { useAuthValue } from '../src/context'
import AddQuote from './components/AddQuote.js'

const PrivateRoute = ({ children, ...rest }) => {
  const { currentUserObj } = useAuthValue()
  return (
    <Route
      {...rest}
      render={({ location }) =>
        currentUserObj.email ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: ROUTES.LOG_IN,
              state: { from: location },
            }}
          />
        )
      }
    />
  )
}

const App = () => {
  const { currentUserObj } = useAuthValue()
  useEffect(() => {
    console.log('app', currentUserObj)
    return () => {}
  }, [currentUserObj])

  return (
    <Router>
      <Navigation authUser={currentUserObj} />

      {currentUserObj ? (
        <>
          <Switch>
            <PrivateRoute exact path={ROUTES.USER_HOME}>
              <HomeAuthPage />
            </PrivateRoute>
            <PrivateRoute exact path={ROUTES.ADD_QUOTE}>
              <AddQuote />
            </PrivateRoute>

            {/* <Route component={PageNotFound} />  */}
          </Switch>
        </>
      ) : (
        <>
          <Switch>
            <Route
              exact
              path={ROUTES.STYLE_GUIDE}
              component={StyleGuidePage}
            />
            <Route
              exact
              path={ROUTES.HOME}
              component={HomeNonAuthPage}
            />
            <Route exact path={ROUTES.SIGN_UP} component={AuthPage} />
            <Route exact path={ROUTES.LOG_IN} component={AuthPage} />
            {/* <Route component={PageNotFound} />  */}
          </Switch>
        </>
      )}
    </Router>
  )
}

export default App
