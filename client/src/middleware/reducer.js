import {combineReducers } from 'redux';
import {borrowerReducer} from "./borrower/borrowerReducer";
import {bookReducer} from "./book/bookReducer";
import {autoCompleteReducer} from "./borrower/autoComleteReducer";

export default combineReducers({
    borrowerReducer,
    bookReducer,
    autoCompleteReducer
});