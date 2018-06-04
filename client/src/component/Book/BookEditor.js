import React, { Component }                                               from 'react';
import { Icon, Grid, Form, Card, Image, Button, Label, Message, Segment } from 'semantic-ui-react';
import default_avatar                                                     from './default_avatar.jpeg';
import '../Borrower/BorrowerEditor.css';
import { ButtonLoading }                                                  from '../../lib';
import { bookService }                                                    from '../../services';
import Borrower                                                           from "../Borrower/Borrower";


class BorrowerEditor extends Component {

    static route = {
        path     : '/book-editor/:id',
        component: localStorage.getItem('role') === 'admin' ? BorrowerEditor : Borrower,
        icon     : <Icon name='book'/>,
        className: 'user_management'
    };

    state = {
        checkReEnterPassword: true,
        isLoading           : false,
        title               : '',
        imageBook           : '',
        amount              : '',
        genre               : '',
        id                  : '',
        dropdownValue       : '',
        publisherOptions    : [],
        author              : ''
    };

    componentDidMount() {
        bookService.getBook(this.props.match.params.id).then(res => {
            this.setState({
                title        : res.data[0].title,
                imageBook    : res.data[0].images,
                amount       : res.data[0].amount,
                genre        : res.data[0].genre,
                id           : res.data[0].id_book,
                author       : res.data[0].author,
                dropdownValue: res.data[0].publisher.id
            });
        });

        bookService.getPublisher().then(res => {
            res.data.map(data => {
                data.text  = data.name;
                data.value = data.id;
                return data
            });

            this.setState({publisherOptions: res.data});
        })
    }

    logChange(e) {
        this.setState({[e.target.name]: e.currentTarget.value});
    }

    handleSave() {
        this.setState({isLoading: true});
        let {id, title, imageBook, amount, genre, author, dropdownValue} = this.state;
        bookService.updateBook({
            title       : title,
            id_book     : id,
            author      : author,
            genre       : genre,
            amount      : amount,
            images      : imageBook,
            publisher_id: dropdownValue

        }).then(() => window.location.href = '/book-management')
    }

    render() {
        const {imageBook, title, isLoading, amount, genre, author, dropdownValue, publisherOptions} = this.state;

        return (
            <div>
                <Segment className={'content-profile'}>
                    <Message
                        attached
                        header={<Label size={'large'} color="green">Book Setting</Label>}
                    />
                    <Form className={'attached fluid segment'}>
                        <Grid stackable>
                            <Grid.Row>
                                <Grid.Column width={11}>
                                    <Form.Group widths='equal'>
                                        <Form.Input fluid label='Title' placeholder='Rikky'
                                                    value={title}
                                                    name='title'
                                                    onChange={this.logChange.bind(this)}
                                        />
                                        <Form.Input fluid label='Amount'
                                                    name='amount'
                                                    value={amount}
                                                    onChange={this.logChange.bind(this)}
                                        />
                                        <br/>
                                    </Form.Group>
                                    <Form.Group widths='equal'>
                                        <Form.Input fluid label='Author'
                                                    name='author'
                                                    value={author}
                                                    onChange={this.logChange.bind(this)}
                                        />
                                        <br/>
                                        <Form.Input fluid label='Genre'
                                                    name='genre'
                                                    value={genre}
                                                    onChange={this.logChange.bind(this)}
                                        />
                                    </Form.Group>
                                    <Form.Group widths='equal'>
                                        <Form.Dropdown placeholder='Select Publishers' fluid selection label='Book'
                                                       value={dropdownValue}
                                                       onChange={(e, items) => this.setState({dropdownValue: items.value})}
                                                       options={publisherOptions}
                                        />
                                    </Form.Group>
                                </Grid.Column>
                                <Grid.Column width={5}>
                                    <Card>
                                        <Image
                                            src={imageBook.length ? imageBook : default_avatar}/>
                                    </Card>
                                </Grid.Column>
                            </Grid.Row>
                            <Grid.Row/>
                            <Grid.Row/>
                            <Grid.Row/>
                            <Grid.Row>
                                <Grid.Column>
                                    {isLoading ?
                                        <ButtonLoading text={'Save'}/>
                                        : <Button primary floated='left' content='Save'
                                                  onClick={this.handleSave.bind(this)}/>
                                    }
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                    </Form>
                </Segment>
            </div>
        )
    }
}

export default BorrowerEditor;