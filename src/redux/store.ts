import { combineReducers, createStore } from 'redux';
import userEventReducer from './user-events';

const rootReducer = combineReducers({ userEvents: userEventReducer });

export type RootState = ReturnType<typeof rootReducer>;

const store = createStore(rootReducer);

export default store;
