import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { Action } from 'redux';
import { StateType } from 'typesafe-actions';
import rootReducer from './reducers';

export type StateInterface = StateType<typeof rootReducer>;

export interface MiddlewareDependencies {}

export type AppThunkAction<ResultType, ActionType> = ThunkAction<
    ResultType,
    StateInterface,
    MiddlewareDependencies,
    Action<ActionType>
>;

export type AppThunkDispatch<ActionType = string> = ThunkDispatch<
    StateInterface,
    MiddlewareDependencies,
    Action<ActionType>
>;

export default StateInterface;
