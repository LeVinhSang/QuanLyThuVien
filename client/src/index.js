import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import {Provider} from "react-redux";
import store from "./middleware/store";
import {BrowserRouter} from 'react-router-dom';
import App from "./App";
import 'antd/dist/antd.css';
import 'typeface-roboto'

ReactDOM.render(
    <BrowserRouter>
        <Provider store={store}>
            <App/>
        </Provider>
    </BrowserRouter>, document.getElementById('root'));
registerServiceWorker();
