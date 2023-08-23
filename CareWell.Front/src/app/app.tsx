import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import { asyncComponent } from '@/core/asyncComponent';

const HomeAddressIndex = asyncComponent(() =>
  import('./home-address').then((x) => x.HomeAddressIndex)
);
const ThemePage = asyncComponent(() => import('./common/themePage').then((x) => x.ThemePage));

export const App: React.FC = () => {
  return (
    <Switch>
      <Route path="/theme" component={ThemePage} />
      <Route path="/homeAddress" component={HomeAddressIndex} />
      <Redirect to="/homeAddress"></Redirect>
    </Switch>
  );
};
