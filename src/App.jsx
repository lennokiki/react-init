import { hot } from 'react-hot-loader'
import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Loadable from '@/components/loadable'
import PrivateRoute from '@/components/private'

const BasicLayout = Loadable(() => import('@/views/layout'))
const Login = Loadable(() => import('@/views/login'))
const Register = Loadable(() => import('@/views/register'))
const Page404 = Loadable(() => import('@/views/exception/404'))
const Page403 = Loadable(() => import('@/views/exception/403'))
const Page500 = Loadable(() => import('@/views/exception/500'))

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/login" name="Login Page" component={Login} />
          <Route exact path="/register" name="Register Page" component={Register} />
          <Route exact path="/exception/404" name="Page 404" component={Page404} />
          <Route exact path="/exception/403" name="Page 403" component={Page403} />
          <Route exact path="/exception/500" name="Page 500" component={Page500} />
          <PrivateRoute path="/" component={BasicLayout} />
        </Switch>
      </Router>
    )
  }
}

export default hot(module)(App)
