import {ConnectedRouter} from 'connected-react-router/immutable';
import {History} from 'history';
import React from 'react';
import routes from './routes';

interface AppProps {
  history: History;
}

function App({history}: AppProps) {
  return (
    <ConnectedRouter history={history} noInitialPop>
      {routes}
    </ConnectedRouter>
  );
}

export default App;