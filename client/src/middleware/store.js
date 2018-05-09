import {addToReducer} from "./reducer";
import {createStore, applyMiddleware} from 'redux';
import borrowerApi from "./borrowerApi";

const store = createStore(addToReducer, applyMiddleware(borrowerApi));

export default store;
