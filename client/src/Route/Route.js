import React from 'react';
import {Route, Switch} from 'react-router-dom';
import Borrower from "../borrower/Borrower";
import BorrowerCard from "../borrower/BorrowerCard";
import Book from "../book/Book";


export default class Router extends React.Component {
    render() {
        return (
            <Switch>
                <Route exact path="/" component={BorrowerCard}/>
                <Route path="/books" component={Book}/>
            </Switch>
        )
    }
}