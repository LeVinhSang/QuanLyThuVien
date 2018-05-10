import {createStore, applyMiddleware} from 'redux';
import borrowerApi from "./borrower/borrowerApi";
import reducer from "./reducer";
import bookApi from "./book/bookApi";

const store = createStore(reducer, applyMiddleware(...[borrowerApi, bookApi]));

export default store;
