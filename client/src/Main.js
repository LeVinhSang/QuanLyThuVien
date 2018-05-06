import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Borrowers from "./borrower/Borrower";

export default class Main extends React.Component {
    render() {
        return (
            <main>
                <Switch>
                    <Route exact path="/" component={Borrowers}/>
                </Switch>
            </main>
        )
    }
}