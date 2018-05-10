import {createStore, applyMiddleware} from 'redux';
import borrowerApi from "./borrower/borrowerApi";
import reducer from "./reducer";

const store = createStore(reducer, applyMiddleware(borrowerApi));

export default store;
