import React, {Component} from 'react';
import store from "./store";
import {addBorrower, checkedBorrower, deleteBorrower, editBorrower} from "./actions";
import {Table, Form, Button} from 'react-bootstrap';
import {Container, Input} from "reactstrap";
import Modal from 'react-modal';
import GetBook from "./GetBook";
import getBorrower from "./getBorrower";
import getBook from "../book/getBook";
import PropTypes from "prop-types";
import Select from 'react-select';


export default class Borrower extends Component {
    constructor(props) {
        super(props);
        this.state = {
            borrowers: store.getState(),
            name_user: '',
            book_id: '',
            date_return: '',
            id: '',
            multi: true,
            multiValue: [],
            books: [],
            value: undefined,
            propTypes: {
                hint: PropTypes.string,
                label: PropTypes.string
            }
        };

        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.logChange = this.logChange.bind(this); // We capture the value and change state as user changes the value here.
        this.handleEdit = this.handleEdit.bind(this); // Function where we submit data
    }

    openModal(member, key) {
        this.setState({
            modalIsOpen: true,
            name_user: member.user.user_name,
            book_id: member.book.id_book,
            date_return: member.date_return,
            id: member.id,
            key: key
        });
    }

    closeModal() {
        this.setState({
            modalIsOpen: false
        });
    }


    componentWillMount() {
        Modal.setAppElement('body');
    }

    componentDidMount() {

        let self = this;
        getBook().then(data => {
            self.setState({
                books: data
            })
        });

        getBorrower().then(data => {
            data.map(data => store.dispatch(addBorrower(data, false)))
        });

        store.subscribe( () => {
            this.setState({borrowers: store.getState()});
        });
    }

    /*-----------------Chang value input------------------*/
    logChange(e) {
        this.setState({
            [e.target.name]: e.target.value //setting value edited by the admin in state.
        });
    }

    /*---------------------Edit Borrower--------------------*/
    handleEdit(e) {
        e.preventDefault();
        let self = this;
        let data = {
            name_user: this.state.name_user,
            book_id: this.state.book_id,
            date_return: this.state.date_return,
            checked: this.state.checked,
            id: this.state.id
        };
        fetch("/borrower", {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then( (response) => {
            if (response.status >= 400) {
                throw new Error("Bad response from server");
            }
            return response.json();
        }).then( data => {
            store.dispatch(editBorrower(data, self.state.key, false));
            self.closeModal();
        }).catch( (err) => {
            console.log(err)
        });
    }


    handleCheckBox(e) {
        store.dispatch(checkedBorrower(e.currentTarget.getAttribute('id'), e.currentTarget.checked));
    }

    /*-----------Add Borrower--------------*/
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
        }).then( (response) => {
            if (response.status >= 400) {
                throw new Error("Bad response from server");
            }
            return response.json();
        }).then( data => store.dispatch(addBorrower(data, false))).catch( (err) => {
            console.log(err)
        });
    }

    /*-----------Select-------------*/
    handleOnChange (value) {
        const { multi } = this.state;
        if (multi) {
            this.setState({ multiValue: value });
        } else {
            this.setState({ value });
        }
    }



    handleDelete() {
        this.state.borrowers.map( borrower => {
            if(borrower.checked === true) {

                fetch('/borrower', {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({id: borrower.id})
                }).catch( (err) => {
                    console.log(err)
                });
            }
        });

        store.dispatch(deleteBorrower(this.state.borrowers));
    }


    render() {
        const { multi, multiValue, books, value } = this.state;

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
                        <th><Button onClick={this.handleDelete.bind(this)}>Delete</Button></th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.borrowers.map( (borrower, index) =>
                        <tr key={borrower.id}>
                            <td>{borrower.user.user_name} </td>
                            <td>{borrower.book.title} </td>
                            <td>{borrower.user.email}</td>
                            <td>{borrower.date_borrow}</td>
                            <td>{borrower.date_return}</td>
                            <td><Button onClick={() => this.openModal(borrower, index)}>Edit</Button>
                                | Delete <input idborrower={borrower.id} onChange={this.handleCheckBox.bind(this)} id={index} checked={borrower.checked} type='checkbox'/>
                            </td>
                        </tr>
                    )}

                    {/*----------Modal Edit Borrower*/}
                    <Modal
                        isOpen={this.state.modalIsOpen}
                        onRequestClose={this.closeModal.bind(this)}
                        contentLabel="Example Modal" >
                        <Form onSubmit={this.handleEdit.bind(this)} onChange={this.logChange.bind(this)}>
                            <label>Name User</label>
                            <Input className="form-control" value={this.state.name_user} placeholder='John' name='name_user' />
                            <label>Book</label>
                            <Input className="form-control" value={this.state.book_id} name='book_id'/>
                            <GetBook books = {this.state.books} />
                            <label>Date Return</label>
                            <Input type="date" className="form-control" value={this.state.date_return} name='date_return'/>
                            <div className="submit-section">
                                <Button className="btn btn-uth-submit">Submit</Button>
                            </div>
                        </Form>
                    </Modal>

                    </tbody>
                </Table>

                {/*--------Form Add Borrower---------------*/}
                <form onSubmit={this.addBorrowerSubmit.bind(this)} onChange={this.logChange.bind(this)}>
                    <label>Name</label>
                    <Input name='name_user' placeholder="name user"/>
                    <label>Book</label>
                    <input name='book_id'/>
                    
                    {/*Tag Select In React Select*/}
                    <div className="section">
                        <Select.Creatable
                            multi={multi}
                            options={books}
                            onChange={this.handleOnChange.bind(this)}
                            value={multi ? multiValue : value}
                        />
                        <div className="hint">{this.props.hint}</div>
                        <div className="checkbox-list">
                            <div>
                                <label className="checkbox">
                                    <input
                                        type="checkbox"
                                        className="checkbox-control"
                                        checked={multi}
                                        onChange={() => this.setState({ multi: true })}
                                    />
                                    <span className="checkbox-label">Multi Select</span>
                                </label>
                            </div>
                            <label className="checkbox">
                                <input
                                    type="checkbox"
                                    className="checkbox-control"
                                    checked={!multi}
                                    onChange={() => this.setState({ multi: false })}
                                />
                                <span className="checkbox-label">Single Value</span>
                            </label>
                        </div>
                    </div>
                    
                    <Input type='date' name='date_return'/>
                    <Input type='submit'/>
                </form>
            </Container>
        )
    }
}
