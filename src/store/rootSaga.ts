import { all, takeLatest } from 'redux-saga/effects';
import { fetchRepos, ReposTypes } from './reducers/repositories';

export default function* rootSaga() {
  yield all([
    takeLatest(ReposTypes.FETCH_REQUEST, fetchRepos)
  ]);
}
