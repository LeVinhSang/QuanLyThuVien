import React                       from 'react';
import ReactDOM                    from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import App                         from './App';
import pages                       from './screens';
import './index.css';

ReactDOM.render(
    <Router>
        <App pages={pages} defaultActive={true}/>
    </Router>,
    document.getElementById('root')
);
