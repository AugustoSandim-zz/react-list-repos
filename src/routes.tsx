import React, { useEffect } from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';
import Dashboard from './containers/Dashboard';

function ScrollToTop() {
  const {pathname} = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export enum PublicRoutes {
  dashboard = '/'
}


const routes = (
  <>
    <ScrollToTop />
    <Switch>
      <Route path={PublicRoutes.dashboard} component={Dashboard} />
    </Switch>
  </>
);

export default routes;