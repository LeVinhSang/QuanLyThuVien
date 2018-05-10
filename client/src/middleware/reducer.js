import {combineReducers } from 'redux';
import {borrowerReducer} from "./borrower/borrowerReducer";
import {bookReducer} from "./book/bookReducer";

export default combineReducers({
    borrowerReducer,
    bookReducer
});