import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import { asyncComponent } from '@/core/asyncComponent';

const HomePage = asyncComponent(() => import('./common/homePage').then((x) => x.HomePage));

const HomeAddressIndex = asyncComponent(() =>
  import('./home-address').then((x) => x.HomeAddressIndex)
);

export const App: React.FC = () => {
  return (
    <Switch>
      <Route path="/homeAddress" component={HomeAddressIndex} />
      <Route path="/home" component={HomePage} />
      <Redirect to="/home"></Redirect>
    </Switch>
  );
};
