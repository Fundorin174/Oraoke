import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import thunkMiddleware from 'redux-thunk';
import startPageReducer from "./startPageReduser";
import settingsPageReducer from "./settingsPageReduser";

let rootReducer = combineReducers({
  startPage: startPageReducer,
  settingsPage: settingsPageReducer,
});

type RootReduserType = typeof rootReducer

export type AppStateType = ReturnType<RootReduserType>

//@ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunkMiddleware)));
//@ts-ignore
window.__store__ = store;

export default store;