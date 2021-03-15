import { routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import throttle from 'lodash.throttle';
import { applyMiddleware, createStore, Store } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { composeEnhancers } from '../utils/composeEnhancers';
import rootReducer, { ApplicationState } from './rootReducer';
import rootSaga from './rootSaga';
import { loadState, saveState } from './services/localStorage';

export const history = createBrowserHistory();

const sagaMiddleware = createSagaMiddleware();

const enhancer = composeEnhancers(
  applyMiddleware(sagaMiddleware, routerMiddleware(history)),
);

const persistedState = loadState();

const store: Store<ApplicationState> = createStore(
  rootReducer(history),
  persistedState,
  enhancer,
);

sagaMiddleware.run(rootSaga);

store.subscribe(
  throttle(() => {
    saveState(store.getState());
  }, 1000),
);
export default store;
