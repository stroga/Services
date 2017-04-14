import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { browserHistory, IndexRoute, Redirect, Route, Router } from 'react-router'

// import App from './components/App.js'
import AppHOC from './HOC.jsx'

import { HomeComponent } from './components/home'
import { LoginComponent } from './components/login'
import configureStore from './store/rootStore'

const storeCombined = configureStore();
// console.log(store.getState().user.name);

// function isAuth(storeState) {
//   console.warn(storeState);
//   const user = store.getState().user;
//   return (nextState, replace, next) => {
//
//     if (user && user.name) {
//       console.log('REDIRECT in ROUTER');
//       replace('/');
//     }
//     console.log('NEXT in ROUTER');
//     next();
//   };
// }
ReactDOM.render(
  <Provider store={storeCombined}>
    <Router history={browserHistory}>
      <Route path="/" component={AppHOC}>
        <IndexRoute component={HomeComponent}/>
        <Route path="/login" component={LoginComponent}/>
      </Route>
      <Redirect from="*" to="/"/>
    </Router>
  </Provider>,
  document.getElementById('root')
)