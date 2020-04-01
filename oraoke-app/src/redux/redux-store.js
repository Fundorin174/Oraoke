import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import thunkMiddleware from 'redux-thunk';
import startPageReducer from "./startPageReduser";
import settingsPageReducer from "./settingsPageReduser";

let rootReducer = combineReducers({
  startPage: startPageReducer,
  settingsPage: settingsPageReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunkMiddleware)));

window.__store__ = store;

export default store;