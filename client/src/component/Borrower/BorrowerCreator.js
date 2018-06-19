import React, { Component }                                               from 'react';
import { Icon, Grid, Form, Card, Image, Button, Label, Message, Segment } from 'semantic-ui-react';
import default_avatar                                                     from '../Book/default_avatar.jpeg';
import './BorrowerEditor.css';
import { ButtonLoading }                                                  from '../../lib';
import { bookService, borrowerService, loginService }                     from '../../services';
import Borrower                                                           from "./Borrower";
import jwt                                                                from 'jsonwebtoken';


class BorrowerCreator extends Component {

    state = {
        checkReEnterPassword: true,
        isLoading           : false,
        bookOptions         : [],
        valueDropdown       : '',
        imageBorrower       : '',
        date_return         : '',
        date_borrow         : '',
        id                  : '',
        users               : [],
        valueUser           : ''
    };

    static route = {
        path     : '/borrower-creator',
        component: localStorage.getItem('token') ?
            jwt.verify(localStorage.getItem('token'), 'sang').role === 'admin' && BorrowerCreator : Borrower,
        icon     : <Icon name='user'/>,
        className: 'user_management'
    };

    componentDidMount () {
        loginService.getUsers().then(res => {
            res.data.map((data, index) => {
                data.key   = index;
                data.value = data.user_name;
                data.text  = data.user_name;
                return data;
            });
            this.setState({ users: res.data })
        });
        bookService.getBooks().then(res => {
            res.data.map(data => {
                data.text  = data.title;
                data.value = data.id_book;
                data.image = data.images;
                return data;
            });

            this.setState({ bookOptions: res.data });
        })
    }

    logChange (e) {
        this.setState({ [ e.target.name ]: e.currentTarget.value });
    }

    handleSave () {
        this.setState({ isLoading: true });
        let { valueDropdown, valueUser, date_return } = this.state;
        borrowerService.createBorrower({
            name_user  : valueUser,
            book_id    : valueDropdown,
            date_return: date_return
        })
            .then(() => window.location.href = '/borrower-management')
    }

    handleDropdown (items) {
        this.setState({
            valueDropdown: items.value,
            imageBorrower: items.options[ items.value - 1 ].images
        });
    }

    render () {
        const { imageBorrower, users, valueDropdown, bookOptions, isLoading, date_return, date_borrow } = this.state;

        return (
            <div>
                <Segment className={'content-profile'}>
                    <Message
                        attached
                        header={<Label size={'large'} color="green">Borrower Create</Label>}
                    />
                    <Form className={'attached fluid segment'}>
                        <Grid stackable>
                            <Grid.Row>
                                <Grid.Column width={11}>
                                    <Form.Group widths='equal'>
                                        <Form.Dropdown label='User Name'
                                                       placeholder='Select Country' fluid search selection
                                                       options={users}
                                                       onChange={(e, items) => this.setState({valueUser: items.value})}
                                        />
                                        <Form.Dropdown placeholder='Select Friend' fluid selection label='Book'
                                                       value={valueDropdown}
                                                       onChange={(e, items) => this.handleDropdown(items)}
                                                       options={bookOptions}
                                        />
                                    </Form.Group>
                                    <Form.Group widths='equal'>
                                        <Form.Input type="date" fluid label='Date Borrow'
                                                    name='date_borrow'
                                                    value={date_borrow}

                                        />
                                        <br/>
                                        <Form.Input type="date" fluid label='Date Return'
                                                    position='right'
                                                    name='date_return'
                                                    value={date_return}
                                                    onChange={this.logChange.bind(this)}
                                        />
                                    </Form.Group>
                                </Grid.Column>
                                <Grid.Column width={5}>
                                    <Card>
                                        <Image
                                            src={imageBorrower.length ? imageBorrower : default_avatar}/>
                                    </Card>
                                </Grid.Column>
                            </Grid.Row>
                            <Grid.Row/>
                            <Grid.Row/>
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

export default BorrowerCreator;