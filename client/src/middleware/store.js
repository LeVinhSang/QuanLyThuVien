import {createStore, applyMiddleware} from 'redux';
import borrowerApi from "./borrower/borrowerApi";
import reducer from "./reducer";
import bookApi from "./book/bookApi";
import userApi from "./user/userApi";

const store = createStore(reducer, applyMiddleware(...[borrowerApi, bookApi, userApi]));

export default store;