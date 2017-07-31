import React, {Component} from 'react';
import TextField from 'material-ui/TextField';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import FlatButton from 'material-ui/FlatButton';
import {browserHistory} from 'react-router';
import PropTypes from 'prop-types';
import axios from 'axios';
import cookie from 'react-cookie';

import {LOGINURL} from '../../constants';

import './account.css';

class AccountComponent extends Component {
  checkBeforePass() {
    if (!!this.props.commonState.user.email) {
      this.props.router.replace('/');
    }
    return;
  }

  componentWillMount() {
    this.checkBeforePass();
  }

  onSubmit() {
    var params = new URLSearchParams();
    params.append('email', this.emailInput.input.value);
    params.append('password', this.passInput.input.value);

    axios
      .post(LOGINURL, params)
      .then((resp) => {
        this.props.updateUser({
          email: resp.data.email,
          username: resp.data.username,
          photo: resp.data.photo
        });
        cookie.save('session', resp.data.session, {
          path: '/',
          maxAge: 172800 // 2 days
        });
        this.goBack();
      })
      .catch((err) => {
        console.log(err.message)
      });
  }

  goBack() {
    browserHistory.goBack();
  }

  render() {
    return (
      <MuiThemeProvider>
        <div className="login-form">
          <form action="" onSubmit={this.onSubmit}>
            <TextField
              name="email"
              hintText={this.props.commonState.languageView.email}
              floatingLabelText={this.props.commonState.languageView.email}
              type="email"
              ref={(input) => this.emailInput = input}
            />
            <TextField
              name="password"
              hintText={this.props.commonState.languageView.password}
              floatingLabelText={this.props.commonState.languageView.password}
              type="password"
              ref={(input) => this.passInput = input}
            />
            <FlatButton label={this.props.commonState.languageView.login || ' '} primary={true}
                        onTouchTap={this.onSubmit.bind(this)}/>
            <FlatButton label={this.props.commonState.languageView.cancel || ' '} onTouchTap={this.goBack}/>
          </form>
        </div>
      </MuiThemeProvider>
    );
  }
}

AccountComponent.propTypes = {
  commonState: PropTypes.shape({
    languageView: PropTypes.object,
    services: PropTypes.array,
    user: PropTypes.object
  })
};

export {AccountComponent};