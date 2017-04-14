import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { browserHistory } from 'react-router';
import cookie from 'react-cookie';

import * as changeLang from './actions/changeLanguage';
import * as updateUser from './actions/updateUserInfo';
import * as uploadServices from './actions/uploadServices';
import App from './components/App';
import { AUTH, DATALANGURL, LANGURL } from './constants';

function HOC (WrappedComponent) {
  return class extends Component {
    static displayName = 'HOC';

    constructor (props) {
      super(props);
      this.checkForLogin = this.checkForLogin.bind(this);
      this.languageRequest = this.languageRequest.bind(this);
      this.loadingStart = this.loadingStart.bind(this);
      this.loadingDone = this.loadingDone.bind(this);

      this.state = {
        isLoading: true,
      };
    }

    languageRequest () {
      return axios.get(LANGURL, { withCredentials: true });
    }

    onLoginClick () {
      browserHistory.push('/login');
    }

    onLanguageChange (lang) {
      if (this.props.commonState.languageView.lang === lang) return;
      this.loadingStart();
      axios
        .get(DATALANGURL + lang)
        .then((res) => {
          let { services, ...langDataFiltered } = res.data;
          this.props.changeLanguage(langDataFiltered);
          this.props.uploadServices(services);
          cookie.save('language', lang, {
            path: '/',
            maxAge: 172800 // 2 days
          });
          this.loadingDone();
        })
        .catch( (err) => {
          console.log(err.message);
          this.loadingDone();
        } );
    }

    checkForLogin () {
      return axios.get(AUTH, { withCredentials: true });
    }

    loadingDone () {
      this.setState({
        isLoading: false,
      });
    }

    loadingStart () {
      this.setState({
        isLoading: true,
      });
    }

    componentWillMount () {
      const self = this;
      axios
        .all([this.checkForLogin(), this.languageRequest()])
        .then(axios.spread(function (userData, langData) {
          let { services, ...langDataFiltered } = langData.data;
          self.props.uploadServices(services);
          self.props.updateUserInfo(userData.data);
          self.props.changeLanguage(langDataFiltered);
          self.loadingDone();
        }));
    }

    render () {
      if (this.props.commonState.languageView.lang) {
        return (
          <WrappedComponent
            {...this.props}
            onLanguageChange={this.onLanguageChange.bind(this)}
            onLoginClick={this.onLoginClick.bind(this)}
            updateUser={this.props.updateUserInfo}
          />
        );
      }

      return null;
    }
  };
}

function mapStateToProps (state) {
  return {
    commonState: state,
  };
}

function mapDispatchToProps (dispatch) {
  return {
    changeLanguage: (data) => {
      dispatch(changeLang.changeLanguage(data));
    },
    updateUserInfo: (val) => {
      dispatch(updateUser.updateUserInfo(val));
    },
    uploadServices: (services) => {
      dispatch(uploadServices.uploadServices(services));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(HOC(App));