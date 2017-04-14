import React, { Component } from 'react';

import treeBuilder from '../../utils/buildTree';

const styles = {
  root: {
    minWidth: '260px',
  },
};

class MenuCategories extends Component {

  state = {
    open: false,
  };

  handleToggle = () => {
    this.setState({
      open: !this.state.open,
    });
  };

  handleNestedListToggle = (item) => {
    this.setState({
      open: item.state.open,
    });
  };

  render () {
    return (
      <div>
        {treeBuilder(this.props.list, styles.root)}
      </div>
    );
  }
}

export { MenuCategories };