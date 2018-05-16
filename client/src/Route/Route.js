import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom';
import BorrowerCard from "../Component/borrower/BorrowerCard";
import Book from "../Component/borrower/book/Book";


export default class Router extends Component {

    render() {
        const self = this;
        return (
            <Switch>
                <Route exact path="/" render={()=><BorrowerCard books={self.props.books} borrowers={self.props.borrowers}/>}/>
                <Route path="/books" render={()=><Book/>}/>
                <Route path="/" component={BorrowerCard}/>
            </Switch>
        )
    }
}