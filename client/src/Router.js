import React           from 'react';
import {Switch, Route} from  'react-router-dom';
import Management      from "./management/management";
import User            from "./user/User";

export default  class Router extends React.Component {

    isAuthenticatedAdmin = () => {
        const user = localStorage.getItem('role');
        if(user === 'admin') {
            return true;
        }
    };

    render() {
        return (
            <main>
                <Switch>
                    <Route exact path='/' component = {User}/>
                    <Route path='/management' component = {this.isAuthenticatedAdmin() ? Management : User}/>
                </Switch>
            </main>
        )
    }
}