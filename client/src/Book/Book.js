import React, { Component }                           from 'react';
import { connect }                                    from 'react-redux';
import { Button, Divider, Image, Label, List, Popup } from 'semantic-ui-react'
import { loadBook }                                   from "../middleware/book/actions";
import { addBorrowerUser }               from "../middleware/borrower/actions";


const mapDispatchToProps = dispatch => {

    return {
        loadBook: () => {
            dispatch(loadBook());
        },

        createBorrower: (user_name, book_id, date_return) => {
            dispatch(addBorrowerUser(user_name, book_id, date_return));
        }
    }
};

const mapStateToProps = state => {
    return {
        books: state.bookReducer,
    }
};


class Book extends Component {

    componentDidMount() {
        this.props.loadBook();
    }

    render() {
        function isAuthenticated() {
            const user = localStorage.getItem('user_name');
            if (user) {
                return true
            }
        }

        let date = new Date();
        date.setMonth( date.getMonth() + 1);
        date = date.toISOString().substr(0, 10);

        return (
            <List relaxed>
                {this.props.books.map((book, index) =>
                    <List.Item key={index}>
                        <Image avatar src={book.images}/>
                        <List.Content>
                            <List.Header as='a'>{book.title}</List.Header>
                            <List.Description>
                                <b>{book.publisher.name}</b>
                            </List.Description>
                            <List.Description>
                                {isAuthenticated() ?
                                    <Popup
                                        trigger={<Button>Borrow</Button>}
                                        content={<div>
                                            <Label>You want borrow book and date return in {date}</Label>
                                            <Divider/>
                                            <Button floated={'right'} onClick={() => this.props.createBorrower(localStorage.getItem('user_name'), book.id_book, date)}>Yes</Button>
                                        </div>}
                                        on='click'
                                        position='bottom center'
                                    />
                                    : ''}
                            </List.Description>
                        </List.Content>
                    </List.Item>
                )}
            </List>
        )
    }

}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Book);