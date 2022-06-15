import { combineReducers, createStore } from "redux";
import task from "./reducer/task";

const reducers = combineReducers({ task });

const store = createStore(reducers);

export default store;
