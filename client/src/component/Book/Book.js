import React, { Component }                                        from 'react';
import { Button, Card, Divider, Icon, Image, Input, Label, Popup } from "semantic-ui-react";
import { borrowerService, bookService }                            from "../../services";
import jwt                                                         from 'jsonwebtoken';


class Book extends Component {

    static route = {
        path     : '/books',
        component: Book,
        icon     : <Icon name='book'/>,
        linkLabel: 'Books',
        className: 'Books'
    };

    state = {
        books     : [],
        bookSearch: []
    };

    componentDidMount() {
        bookService.getBooks().then(res => {
            this.setState({
                books     : res.data,
                bookSearch: res.data
            })
        });
    }

    onChangeInputSearch(e) {
        let updatedList = this.state.books;
        updatedList     = updatedList.filter(item =>
            item.title.toLowerCase().search(e.currentTarget.value.toLowerCase()) !== -1);
        this.setState({bookSearch: updatedList});
    }

    isAuthentication = () => {
        return !!localStorage.getItem('token');
    };

    handleBorrowCLick(id) {
        let date = new Date();
        date.setMonth(date.getMonth() + 1);
        date          = date.toISOString().substr(0, 10);
        let name_user = jwt.verify(localStorage.getItem('token'), 'sang').user_name;
        borrowerService.createBorrower({
            name_user  : name_user,
            book_id    : id,
            date_return: date
        }).then(() => alert('success'));
    }

    render() {

        let date = new Date();
        date.setMonth(date.getMonth() + 1);
        date = date.toISOString().substr(0, 10);

        return (
            <div>
                <h4>Total: {this.state.books.length}</h4>
                <div>
                    <Input style={{width: '300px'}} icon='search' placeholder='Search....' size='mini'
                           onChange={this.onChangeInputSearch.bind(this)}/>
                </div>
                <Divider inverted hidden/>
                <Card.Group>
                    {this.state.bookSearch.map((book, index) =>
                        <Card key={index} style={{width: 200}}>
                            <Card.Content>
                                <Image floated='right' size='mini' src={book.images}/>
                                <Card.Header>
                                    {book.title}
                                </Card.Header>
                                <Card.Meta>
                                    {book.publisher.name}
                                </Card.Meta>
                                <Card.Description>
                                    Genre: <strong>{book.genre}</strong> || Amount: <strong>{book.amount}</strong>
                                </Card.Description>
                            </Card.Content>
                            <Card.Content extra>
                                <div className='ui two buttons'>
                                    {this.isAuthentication() ?
                                        <div>
                                            <Popup
                                                on='click'
                                                hideOnScroll
                                                trigger={<Button content={'Detail'} basic color='green'/>}
                                                content={<div>
                                                    Detail: .....
                                                </div>}
                                            />
                                            <Popup
                                                trigger={<Button basic color='red'>Borrow</Button>}
                                                content={<div>
                                                    <Label>You want borrow book and date return in {date}</Label>
                                                    <Divider/>
                                                    <Button fluid content={'Borrow'} basic color='blue'
                                                            onClick={() => this.handleBorrowCLick(book.id_book)}/>
                                                </div>}
                                                on='click'
                                                position='bottom center'
                                            />
                                        </div>
                                        :
                                        <Popup
                                            on='click'
                                            hideOnScroll
                                            trigger={<Button content={'Detail'} basic color='green'/>}
                                            content={<div>
                                                Detail: .....
                                            </div>}
                                        />
                                    }
                                </div>
                            </Card.Content>
                        </Card>
                    )}
                </Card.Group>
            </div>
        )
    }
}

export default Book;