import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { browserHistory, IndexRoute, Redirect, Route, Router } from 'react-router'

import AppHOC from './HOC.jsx'

import { HomeComponent } from './components/home'
import { LoginComponent } from './components/login'
import { getStore } from './store/rootStore'
import {AccountComponent} from "./components/account/accouont.component";

const storeCombined = getStore();

ReactDOM.render(
  <Provider store={storeCombined}>
    <Router history={browserHistory}>
      <Route path="/" component={AppHOC}>
        <IndexRoute component={HomeComponent}/>
        <Route path="/login" component={LoginComponent}/>
        <Route path="/myaccouont" component={AccountComponent}/>
      </Route>
      <Redirect from="*" to="/"/>
    </Router>
  </Provider>,
  document.getElementById('root')
)