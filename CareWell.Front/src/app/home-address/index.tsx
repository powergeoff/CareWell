import React, { useState } from 'react';
import { Route, Switch, useRouteMatch, Redirect } from 'react-router-dom';
import { DefaultPage } from '@/shared';

import { HomeAddressPage } from './homeAddressPage';
import { HomeAddressSavePage } from './homeAddressSavePage';

export const HomeAddressIndex = () => {
  const match = useRouteMatch();
  const [counter, setCounter] = useState<number>(0);
  const handleSetCounter = (type: string): void => {
    let myCount = counter;
    if (type === 'add') {
      myCount++;
    } else {
      myCount--;
    }
    setCounter(myCount);
  };
  return (
    <DefaultPage showMenu="none">
      <Switch>
        <Route path={match.url + '/verify'}>
          <HomeAddressPage counter={counter} setCounter={handleSetCounter} />
        </Route>
        <Route path={match.url + '/save'}>
          <HomeAddressSavePage counter={counter} setCounter={handleSetCounter} />
        </Route>
        <Redirect to={match.url + '/verify'} />
      </Switch>
    </DefaultPage>
  );
};
