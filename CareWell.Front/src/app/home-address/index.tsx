import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';

import { HomeAddressPage } from './homeAddressPage';

export const HomeAddressIndex = () => {
  const match = useRouteMatch();
  return (
    <Switch>
      <Route path={match.url + '/'} component={HomeAddressPage} />
    </Switch>
  );
};
