import React, { Component } from 'react';
import './header.css';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';
import AppBar from 'material-ui/AppBar';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import NavigationMenu from 'material-ui/svg-icons/navigation/menu';
import PropTypes from 'prop-types';
import cookie from 'react-cookie';
import Popover from 'material-ui/Popover';

import { MenuCategories } from '../menu-categories';

const Login = (props) => {
  return (
    <FlatButton
      {...{ style: props.style }}
      label={props.commonState.languageView.login || ' '}
      onTouchTap={props.onLoginClick}
    />
  );
};

Login.muiName = 'FlatButton';

const Logged = (props) => {
  const iconStyled = Object.assign({}, { iconStyle: props.iconStyle });
  const { iconStyle, ...rest } = props;

  const logOut = () => {
    cookie.remove('session');
    rest.updateUser('');
  };

  return (
    <IconMenu
      {...iconStyled}
      iconButtonElement={
        <IconButton><MoreVertIcon /></IconButton>
      }
      targetOrigin={{ horizontal: 'right', vertical: 'top' }}
      anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
    >
      <MenuItem primaryText={rest.commonState.languageView.account}/>
      <MenuItem primaryText={rest.commonState.languageView.logout} onTouchTap={logOut}/>
    </IconMenu>

  );
};

Logged.muiName = 'IconMenu';

class HeaderComponent extends Component {
  static propTypes = {
    commonState: PropTypes.shape({
      languageView: PropTypes.object,
      services: PropTypes.array,
      user: PropTypes.object,
    }).isRequired,
    onLanguageChange: PropTypes.func.isRequired,
    updateUserInfo: PropTypes.func.isRequired,
    onLoginClick: PropTypes.func.isRequired,
  };

  constructor (props) {
    super(props);
    this.state = {
      isOpen: false,
      menuAnchorEl: '',
    };
  }

  componentDidMount() {
    this.setState({
      menuAnchorEl: document.querySelector('.top-bar')
    })
  }

  onMenuClick (event) {
    event.preventDefault();
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  menuBurger () {

    return (
      <IconButton>
        {this.state.isOpen ? <NavigationClose onTouchTap={this.onMenuClick.bind(this)}/> :
          <NavigationMenu onTouchTap={this.onMenuClick.bind(this)}/> }
      </IconButton>
    );
  };

  onCloseMenu() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render () {
    return (
      <div className="top-bar">
        <div>
          <div className="toggler-lang-ru" onClick={this.props.onLanguageChange.bind(this, 'ru')}>Ru</div>
          <div className="toggler-lang-en" onClick={this.props.onLanguageChange.bind(this, 'en')}>En</div>
        </div>
        <AppBar
          title={this.props.commonState.languageView.title}
          iconElementLeft={this.menuBurger()}
          iconElementRight={!!this.props.commonState.user.email ? <Logged {...this.props} /> : <Login {...this.props}/>}
        />
        {this.state.isOpen ? <Popover
          open={this.state.isOpen}
          anchorEl={this.state.menuAnchorEl}
          anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
          targetOrigin={{horizontal: 'left', vertical: 'top'}}
          onRequestClose={this.onCloseMenu.bind(this)}
        ><MenuCategories list={this.props.commonState.services}/></Popover> : null }
      </div>
    );
  }
}

export { HeaderComponent };