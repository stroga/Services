import React from 'react';

import { HeaderComponent } from '../header';
import { TeaserComponent } from '../teaser';

export const HomeComponent = (props) => {
  return (
    <div>
      <HeaderComponent {...props} ></HeaderComponent>
      <TeaserComponent></TeaserComponent>
    </div>
  );
};
