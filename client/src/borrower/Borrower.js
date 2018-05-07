import React, {Component} from 'react';
import store from "./store";
import {addBorrower, editBorrower} from "./actions";
import {Table, Form} from 'react-bootstrap';
import {Container, Input, Button} from "reactstrap";
import Modal from 'react-modal';
import GetBook from "./GetBook";

export default class GetBorrowers extends Component {
    constructor(props) {
        super(props);
        this.state = {
            borrowers:[],
            name_user: '',
            book_id: '',
            date_return: '',
            id: ''
        };

        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.logChange = this.logChange.bind(this); // We capture the value and change state as user changes the value here.
        this.handleEdit = this.handleEdit.bind(this); // Function where we submit data
    }

    openModal(member) {
        this.setState({
            modalIsOpen: true,
            name_user: member.user.user_name,
            book_id: member.book.id_book,
            date_return: member.date_return,
            id: member.id
        });
    }

    componentWillMount() {
        Modal.setAppElement('body');
    }

    closeModal() {
        this.setState({
            modalIsOpen: false
        });
    }

    async componentDidMount() {
        console.log(await store.getState());
        this.setState({borrowers: await store.getState()});
        store.subscribe( async () => {
            this.setState({borrowers: await store.getState()});
        });
    }

    logChange(e) {
        this.setState({
            [e.target.name]: e.target.value //setting value edited by the admin in state.
        });
    }

    handleEdit(e) {
        e.preventDefault();
        let self = this;
        let data = {
            name_user: this.state.name_user,
            book_id: this.state.book_id,
            date_return: this.state.date_return,
            id: this.state.id
        };
        fetch("/borrower", {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then( () => {
            store.dispatch(editBorrower(data));
            self.closeModal();
        }).catch(function(err) {
            console.log(err)
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
                            <td><a onClick={() => this.openModal(borrower)}>Edit</a>|<a>Delete</a></td>
                        </tr>
                    )}

                    {/*modal edit borrower*/}

                    <Modal
                        isOpen={this.state.modalIsOpen}
                        onRequestClose={this.closeModal}
                        contentLabel="Example Modal" >
                        <Form onSubmit={this.handleEdit.bind(this)} method="POST">
                            <label>Name User</label>
                            <Input onChange={this.logChange.bind(this)} className="form-control" value={this.state.name_user} placeholder='John' name='name_user_put' />
                            <label>Book</label>
                            <GetBook/>
                            <label>Date Return</label>
                            <Input onChange={this.logChange.bind(this)} type="date" className="form-control" value={this.state.date_return} name='date_return_put'/>
                            <div className="submit-section">
                                <Button className="btn btn-uth-submit">Submit</Button>
                            </div>
                        </Form>
                    </Modal>

                    </tbody>
                </Table>
                <form onSubmit={this.addBorrowerSubmit.bind(this)}>
                    <label>Name</label>
                    <Input onChange={this.logChange.bind(this)} name='name_user' placeholder="name user"/>
                    <label>Book</label>
                    <input onChange={this.logChange.bind(this)} name='book_id'/>
                    <GetBook/>
                    <Input type='date' onChange={this.logChange.bind(this)} name='date_return'/>
                    <Input type='submit'/>
                </form>
            </Container>
        )
    }
}
