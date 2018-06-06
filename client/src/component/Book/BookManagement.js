import React, { Component }                           from 'react';
import { Checkbox, Table, Button, Input, Grid, Icon } from 'semantic-ui-react';
import { Link }                                       from 'react-router-dom';
import { bookService }                                from "../../services/index";
import Borrower                                       from "../Borrower/Borrower";
import jwt                                            from 'jsonwebtoken';


class BookManagement extends Component {

    static route = {
        path     : '/book-management',
        component: localStorage.getItem('token') ?
            jwt.verify(localStorage.getItem('token'), 'sang').role === 'admin' && BookManagement : Borrower,
        icon     : <Icon name='book'/>,
        linkLabel: localStorage.getItem('token') ?
            jwt.verify(localStorage.getItem('token'), 'sang').role === 'admin' && 'Book Management' : null,
        className: 'book_management'
    };

    state = {
        books     : [],
        bookSearch: [],
    };

    componentDidMount() {
        bookService.getBooks().then(res => {
            res.data.map(data => {
                data.checked = false;
                return data;
            });
            this.setState({
                books     : res.data,
                bookSearch: res.data,
            })
        });
    }

    onChangeInputSearch(e) {
        let updatedList = this.state.books;
        updatedList     = updatedList.filter(item =>
            item.title.toLowerCase().search(e.currentTarget.value.toLowerCase()) !== -1);
        this.setState({bookSearch: updatedList});
    }

    handleCheckedBook = (id, checked) => {
        let books         = this.state.bookSearch;
        books[id].checked = checked;
        this.setState({bookSearch: books});
    };

    handleDelete() {
        let {bookSearch} = this.state;
        bookSearch.map(book => book.checked && bookService.deleteBook(book.id_book));
        let books = bookSearch.filter(book => !book.checked);
        this.setState({bookSearch: books});
    }

    render() {

        let {bookSearch} = this.state;
        return (
            <div>
                <h4>Total: {this.state.bookSearch.length}</h4>
                <Grid>
                    <Grid.Column width={16} style={{paddingLeft: 0}}>
                        <Input style={{
                            float: 'right',
                            width: 300
                        }} icon='search' placeholder='Search....' size='mini'
                               onChange={this.onChangeInputSearch.bind(this)}/>
                    </Grid.Column>
                </Grid>
                <Table>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell width={4}>Title</Table.HeaderCell>
                            <Table.HeaderCell width={3}>Author</Table.HeaderCell>
                            <Table.HeaderCell width={4}>Publisher</Table.HeaderCell>
                            <Table.HeaderCell width={2}>Genre</Table.HeaderCell>
                            <Table.HeaderCell textAlign='center' width={2}>Amount</Table.HeaderCell>
                            <Table.HeaderCell textAlign='center' width={1}>
                                <Button basic color='blue' onClick={this.handleDelete.bind(this)}
                                        icon='trash'/>
                            </Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {bookSearch.map((book, index) =>
                            <Table.Row key={index}>
                                <Table.Cell><Link to={{
                                    pathname: `/book-editor/${book.id_book}`
                                }}>{book.title}</Link></Table.Cell>
                                <Table.Cell>{book.author}</Table.Cell>
                                <Table.Cell>{book.publisher.name}</Table.Cell>
                                <Table.Cell>{book.genre}</Table.Cell>
                                <Table.Cell textAlign='center'>
                                    <p style={styles.capitalize}>{book.amount}</p>
                                </Table.Cell>
                                <Table.Cell textAlign='center'>
                                    <Checkbox checked={book.checked}
                                              onChange={(e, items) => this.handleCheckedBook(index, items.checked)}/>
                                </Table.Cell>
                            </Table.Row>
                        )}
                        <Table.Row>
                            <Table.Cell colSpan={5}><u><i>More</i></u></Table.Cell>
                            <Table.Cell textAlign='center'>
                                <Link to='/borrower-create'>
                                    <Icon name={'plus circle'} size={'large'}/>
                                </Link>
                            </Table.Cell>
                        </Table.Row>
                    </Table.Body>
                </Table>
            </div>
        );
    }
}

const styles = {
    capitalize: {
        textTransform: 'capitalize'
    }
};

export default BookManagement;
