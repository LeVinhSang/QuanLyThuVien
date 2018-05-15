import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom';
import Borrower from "../borrower/Borrower";
import BorrowerCard from "../borrower/BorrowerCard";
import Book from "../book/Book";


export default class Router extends Component {

    render() {
        const self = this;
        return (
            <Switch>
                <Route exact path="/" render={()=><BorrowerCard borrowers={self.props.borrowers}/>}/>
                <Route path="/" render={()=><Book/>}/>
                <Route path="/" component={BorrowerCard}/>
                <Route path="/admin/borrower" component={Borrower}/>
            </Switch>
        )
    }
}