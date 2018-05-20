import {combineReducers } from 'redux';
import {borrowerReducer} from "./borrower/borrowerReducer";
import {bookReducer} from "./book/bookReducer";
import {userReducer} from "./user/userReducer";

export default combineReducers({
    borrowerReducer,
    bookReducer,
    userReducer
});