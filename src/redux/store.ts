import { combineReducers, createStore } from 'redux';
import recorderReducer from './recorder';
import userEventReducer from './user-events';

const rootReducer = combineReducers({
  userEvents: userEventReducer,
  recorder: recorderReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

const store = createStore(rootReducer);

export default store;
