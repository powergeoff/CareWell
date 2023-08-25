import React from 'react';
import { Route, Switch, useRouteMatch, Redirect } from 'react-router-dom';
import { DefaultPage } from '@/shared';

import { HomeAddressPage } from './homeAddressPage';
import { HomeAddressSavePage } from './homeAddressSavePage';

export const HomeAddressIndex = () => {
  const match = useRouteMatch();
  return (
    <DefaultPage showMenu="none">
      <Switch>
        <Route path={match.url + '/verify'} component={HomeAddressPage} />
        <Route path={match.url + '/save'} component={HomeAddressSavePage} />
        <Redirect to={match.url + '/verify'} />
      </Switch>
    </DefaultPage>
  );
};
