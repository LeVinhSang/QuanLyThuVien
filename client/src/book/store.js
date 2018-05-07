import {createStore} from "redux";
import {addToReducer} from "./reducers";

const store = createStore(addToReducer);

export default store;