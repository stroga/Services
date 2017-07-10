import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { browserHistory } from 'react-router';

import * as changeLang from './actions/changeLanguage';
import * as updateUser from './actions/updateUserInfo';
import * as uploadServices from './actions/uploadServices';
import App from './components/App';
import { AUTH, LANGURL } from './constants';


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
      this.props.startChangeLang(lang);
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
      this.props.onChangeUserInfo();
      this.props.onGetLanguage();
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
    updateUserInfo: (val) => {
      dispatch(updateUser.updateUserInfo(val));
    },
    uploadServices: (services) => {
      dispatch(uploadServices.uploadServices(services));
    },
    onChangeUserInfo: (val) => {
      dispatch(updateUser.onChangeUserInfo(val));
    },
    onGetLanguage: (val) => {
      dispatch(changeLang.onGetLanguage());
    },
    startChangeLang: (lang) => {
      dispatch(changeLang.onStartChangeLanguage(lang));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(HOC(App));