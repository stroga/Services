import React, { Component } from 'react';
import './teaser.css';

class TeaserComponent extends Component {
  render () {
    return (
      <div className="teaser">
        <img className="large-img" src="./assets/img/teaser.jpg" width="100%" alt="Main teaser"/>
        <img className="big-img" src="./assets/img/teaser_1280.jpg" width="100%" alt="Main teaser"/>
        <img className="medium-img" src="./assets/img/teaser_640.jpg" width="100%" alt="Main teaser"/>
        <img className="small-img" src="./assets/img/teaser_364.jpg" width="100%" alt="Main teaser"/>
      </div>
    );
  }
}

export { TeaserComponent };