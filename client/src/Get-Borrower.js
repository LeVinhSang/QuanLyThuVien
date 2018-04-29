import React, {Component} from 'react';
import 'react-bootstrap/dist/react-bootstrap.min';

export default class Borrowers extends Component {
    constructor(props) {
        super(props);
        this.state = {
            borrowers: []
        }
    }

    componentDidMount() {
        let self = this;
        fetch('/borrowers', {
            method: 'GET'
        }).then(function(response) {
            if (response.status >= 400) {
                throw new Error("Bad response from server");
            }
            return response.json();
        }).then(function(data) {
            self.setState({borrowers: data});
        }).catch(err => {
            console.log('caught it!',err);
        })
    }

    render() {
        return (
            <div className="container">
                <div className="panel panel-default p50 uth-panel">
                    <table className="striped bordered condensed hover">
                        <thead>
                        <tr>
                            <th>borrower name</th>
                            <th>borrower email</th>
                            <th>Blood Group</th>
                            <th>Phone number</th>
                            <th>Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.state.borrowers.map(borrower =>
                            <tr key={borrower.id}>
                                <td>{borrower.user.user_name} </td>
                                <td>{borrower.user.email} </td>
                                <td>{borrower.book.title}</td>
                                <td>{borrower.date_borrow}</td>
                                <td>{borrower.date_return}</td>
                                <td><a>Edit</a>|<a>Delete</a></td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}