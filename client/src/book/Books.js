import React, {Component} from 'react';
import  {Table, Container} from 'reactstrap';

export default class Books extends Component {
    constructor(props) {
        super(props);
        this.state = {
            borrowers: []
        }
    }

    componentDidMount() {
        let self = this;
        fetch('/books', {
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
            <Container>
                <Table>
                    <thead>
                    <tr>
                        <th>title</th>
                        <th>author</th>
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
                </Table>
            </Container>
        );
    }
}