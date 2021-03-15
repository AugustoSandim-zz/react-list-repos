import {connectRouter, RouterState} from 'connected-react-router/immutable';
import {History} from 'history';
import {Map} from 'immutable';
import {combineReducers} from 'redux-immutable';
import reposReducter, { ReposState } from './reducers/repositories';

export interface ApplicationState extends Map<any, any> {
  readonly repos: ReposState;
  readonly router: RouterState;
}

const rootReducer = (history: History) =>
  combineReducers({
    repos: reposReducter,
    router: connectRouter(history),
  });

export default rootReducer;
