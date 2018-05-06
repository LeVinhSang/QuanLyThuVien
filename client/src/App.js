import React, { Component } from 'react';
import './App.css';
import Main from "./Main";
import Layout from "./layout";

class App extends Component {
    render() {
        return (
            <div>
                <Layout/>
                <Main/>
            </div>
        );
    }
}

export default App;
