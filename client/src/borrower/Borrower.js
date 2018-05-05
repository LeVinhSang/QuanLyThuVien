import React, {Component} from 'react';
import store from "./store";
import {addBorrower} from "./actions";
import {Table} from 'react-bootstrap';
import {Container, Input} from "reactstrap";

export default class Borrowers extends Component {
    constructor(props) {
        super(props);
        this.state = {
            borrowers: store.getState(),
            name_user: '',
            book_id: '',
            date_return: ''
        };
    }

    //todo edit key color red :))
    componentDidMount() {
        let self = this;
        fetch('/borrowers', {
            method: 'GET'
        }).then(function(response) {
            if (response.status >= 400) {
                throw new Error("Bad response from server");
            }
            return response.json();
        }).then(data => {
            console.log(data);
            self.setState({borrowers: data});
        }).catch(err => {
            console.log('caught it!', err);
        });
        store.subscribe( () => {
            this.setState({borrowers: store.getState()});
        });
    }

    logChange(e) {
        this.setState({
            [e.target.name]: e.target.value //setting value edited by the admin in state.
        });
    }

    addBorrowerSubmit(e) {
        e.preventDefault();
        let data = {
            name_user: this.state.name_user,
            book_id: this.state.book_id,
            date_return: this.state.date_return
        };

        fetch('/borrower', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(function(response) {
            if (response.status >= 400) {
                throw new Error("Bad response from server");
            }
            return response.json();
        }).then(function(data) {
            store.dispatch(addBorrower(data));
        }).catch(function(err) {
            console.log(err)
        });
    }

    render() {
        return (
            <Container>
                <Table striped bordered condensed hover>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Book</th>
                            <th>Email</th>
                            <th>Date borrow</th>
                            <th>Date return</th>
                        </tr>
                    </thead>
                    <tbody>
                    {this.state.borrowers.map( borrower =>
                        <tr key={borrower.id}>
                            <td>{borrower.user.user_name} </td>
                            <td>{borrower.book.title} </td>
                            <td>{borrower.user.email}</td>
                            <td>{borrower.date_borrow}</td>
                            <td>{borrower.date_return}</td>
                            <td><a>Edit</a>|<a>Delete</a></td>
                        </tr>
                    )}
                    </tbody>
                </Table>
                <form onSubmit={this.addBorrowerSubmit.bind(this)}>
                    <label>Name</label>
                    <Input onChange={this.logChange.bind(this)} value={this.state.name_user} name='name_user' placeholder="name user"/>
                    <label>ID Book</label>
                    <Input type='number' onChange={this.logChange.bind(this)} value={this.state.book_id} name='book_id' placeholder="book_id"/>
                    <label>Date Return</label>
                    <Input type='date' onChange={this.logChange.bind(this)} value={this.state.date_return} name='date_return'/>
                    <Input type='submit'/>
                </form>
            </Container>
        )
    }
}
