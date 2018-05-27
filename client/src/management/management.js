import React, { Component }                          from 'react'
import { Button, Checkbox, Divider, Table }          from 'semantic-ui-react'
import { withRouter }                                from "react-router-dom";
import { deleteBook, editCheckedBook, loadBook }     from "../middleware/book/actions";
import { deleteBorrower, editChecked, loadBorrower } from "../middleware/borrower/actions";
import { connect }                                   from 'react-redux';

const mapDispatchToProps = dispatch => {
    return {
        loadBorrower: () => {
            dispatch(loadBorrower());
        },

        loadBook: () => {
            dispatch(loadBook())
        },

        editChecked: (id, checked) => {
            dispatch(editChecked(id, checked));
        },

        deleteBorrower: (borrowers) => {
            dispatch(deleteBorrower(borrowers));
        },

        editCheckedBook: (id, checked) => {
            dispatch(editCheckedBook(id, checked));
        },

        deleteBook: (books) => {
            dispatch(deleteBook(books));
        }
    }
};

const mapStateToProps = state => {
    return {
        borrowers: state.borrowerReducer,
        books    : state.bookReducer
    };
};

class Management extends Component {


    componentDidMount() {
        this.props.loadBorrower();
        this.props.loadBook();
    }

    render() {

        return (
            <div>
                <Table singleLine>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Name</Table.HeaderCell>
                            <Table.HeaderCell>Book</Table.HeaderCell>
                            <Table.HeaderCell>E-mail address</Table.HeaderCell>
                            <Table.HeaderCell>Date Borrow</Table.HeaderCell>
                            <Table.HeaderCell>Date Return</Table.HeaderCell>
                            <Table.HeaderCell><Button
                                onClick={() => this.props.deleteBorrower(this.props.borrowers)}>Delete</Button>
                            </Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        {this.props.borrowers.map((borrower, index) =>
                            <Table.Row key={index}>
                                <Table.Cell>{borrower.user.user_name}</Table.Cell>
                                <Table.Cell>{borrower.book.title}</Table.Cell>
                                <Table.Cell>{borrower.user.email}</Table.Cell>
                                <Table.Cell>{borrower.date_borrow}</Table.Cell>
                                <Table.Cell>{borrower.date_return}</Table.Cell>
                                <Table.Cell>
                                    <Checkbox checked={borrower.checked}
                                              onChange={(e, items) => this.props.editChecked(index, items.checked)}/>
                                </Table.Cell>
                            </Table.Row>
                        )}
                    </Table.Body>
                </Table>
                <Divider/>
                <Table singleLine>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Title</Table.HeaderCell>
                            <Table.HeaderCell>Author</Table.HeaderCell>
                            <Table.HeaderCell>Publisher</Table.HeaderCell>
                            <Table.HeaderCell>Amount</Table.HeaderCell>
                            <Table.HeaderCell>Genre</Table.HeaderCell>
                            <Table.HeaderCell><Button onClick={() => this.props.deleteBook(this.props.books)}>Delete</Button></Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        {this.props.books.map((book, index) =>
                            <Table.Row key={index}>
                                <Table.Cell>{book.title}</Table.Cell>
                                <Table.Cell>{book.author}</Table.Cell>
                                <Table.Cell>{book.publisher.name}</Table.Cell>
                                <Table.Cell>{book.amount}</Table.Cell>
                                <Table.Cell>{book.genre}</Table.Cell>
                                <Table.Cell>
                                    <Checkbox checked={book.checked}
                                              onChange={(e, items) => this.props.editCheckedBook(index, items.checked)}/>
                                </Table.Cell>
                            </Table.Row>
                        )}
                    </Table.Body>
                </Table>
            </div>
        )
    }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Management));