import React, { Component } from 'react';
import './App.css';
import Borrower from "./borrower/Borrower";

class App extends Component {
    render() {
        return (
            <div className="App">
                <Borrower/>
            </div>
        );
    }
}

export default App;
