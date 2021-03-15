import { fromJS, List, Map } from 'immutable';
import { AnyAction, Reducer } from 'redux';
import { call, put } from 'redux-saga/effects';
import { ApplicationState } from '../../rootReducer';
import { action } from 'typesafe-actions';
import { fetchReposService, ReposParams } from '../../services/repositories';

// Actions Type
export enum ReposTypes {
    FETCH_REQUEST = '@repos/FETCH_REQUEST',
    FETCH_SUCCESS = '@repos/FETCH_SUCCESS',
    FETCH_FAILURE = '@repos/FETCH_FAILURE',
}

// Data Types
export interface Repository {
    id: number,
    node_id: string,
    name: string,
    full_name: string,
    description: string,
    private: boolean,
    created_at: string,
    language: string,
}

// State Type
export interface ReposState extends Map<any, any> {
    readonly data: List<ImmutableMap<Repository>>;
    readonly loading: boolean;
    readonly error: boolean;
}

export interface ReposGetResponse {
    result: Array<Repository>;
}

// Actions
export const fetchReposRequest = (params?: ReposParams) =>
    action(ReposTypes.FETCH_REQUEST, params);

export const fetchReposSuccess = (data: any) =>
    action(ReposTypes.FETCH_SUCCESS, { data });

export const fetchReposFailure = () => action(ReposTypes.FETCH_FAILURE);

// Sagas
export function* fetchRepos(action: AnyAction) {
    try {
        const response = yield call(fetchReposService, action.payload);
        yield put(fetchReposSuccess(response.data));
    } catch (error) {
        yield put(fetchReposFailure());
    }
}

//Initial state
export const INITIAL_STATE: ReposState = fromJS({
    data: fromJS([]),
    error: false,
    loading: false,
});

// Selectors
export const getReposData = (state: ApplicationState) =>
    state.getIn(['repos', 'data']);

export const getReposError = (state: ApplicationState) =>
    state.getIn(['repos', 'error']);

export const getReposCount = (state: ApplicationState) =>
    state.getIn(['repos', 'dataCount']);

export const getIsLoadingRepos = (state: ApplicationState) =>
    state.getIn(['repos', 'loading']);

//Reducer
const reducer: Reducer<ReposState> = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ReposTypes.FETCH_REQUEST:
            return state.withMutations((prevState) => prevState.set('loading', true));

        case ReposTypes.FETCH_SUCCESS:
            return state.withMutations((prevState) =>
                prevState
                    .set('loading', false)
                    .set('error', false)
                    .set('dataCount', action.payload.data.count)
                    .set('data', fromJS(action.payload.data)),
            );
        default:
            return state;
    }
};

export default reducer;
