import React, { Component }                                               from 'react';
import { Icon, Grid, Form, Card, Image, Button, Label, Message, Segment } from 'semantic-ui-react';
import default_avatar                                                     from '../Book/default_avatar.jpeg';
import './BorrowerEditor.css';
import { ButtonLoading }                                                  from '../../lib';
import { bookService, borrowerService }                                   from '../../services';
import Borrower                                                           from "./Borrower";


class BorrowerEditor extends Component {

    state = {
        checkReEnterPassword: true,
        isLoading           : false,
        bookOptions         : [],
        valueDropdown       : '',
        name_user           : '',
        imageBorrower       : '',
        date_return         : '',
        date_borrow         : '',
        id                  : ''
    };

    static route = {
        path     : '/borrower-editor/:id',
        component: localStorage.getItem('role') === 'admin' ? BorrowerEditor : Borrower,
        icon     : <Icon name='user'/>,
        className: 'user_management'
    };

    componentDidMount() {
        borrowerService.getBorrower(this.props.match.params.id).then(res => {
            this.setState({
                valueDropdown: res.data[0].book.id_book,
                name_user    : res.data[0].user.user_name,
                imageBorrower: res.data[0].user.avatar,
                date_return  : res.data[0].date_return,
                date_borrow  : res.data[0].date_borrow,
                id           : res.data[0].id
            });
        });
        bookService.getBooks().then(res => {
            res.data.map(data => {
                data.text  = data.title;
                data.value = data.id_book;
                data.image = data.images;
                return data;
            });

            this.setState({bookOptions: res.data});
        })
    }

    logChange(e) {
        this.setState({[e.target.name]: e.currentTarget.value});
    }

    handleSave() {
        this.setState({isLoading: true});
        let {id, valueDropdown, name_user, date_return} = this.state;
        borrowerService.updateBorrower({id: id, name_user: name_user, book_id: valueDropdown, date_return: date_return})
            .then( () => window.location.href = '/borrower-management')
    }

    render() {
        const {imageBorrower, valueDropdown, name_user, bookOptions, isLoading, date_return, date_borrow} = this.state;

        return (
            <div>
                <Segment className={'content-profile'}>
                    <Message
                        attached
                        header={<Label size={'large'} color="green">Personal Setting</Label>}
                    />
                    <Form className={'attached fluid segment'}>
                        <Grid stackable>
                            <Grid.Row>
                                <Grid.Column width={11}>
                                    <Form.Group widths='equal'>
                                        <Form.Input fluid label='User Name' placeholder='Rikky'
                                                    value={name_user}
                                                    name='name_user'
                                        />
                                        <Form.Dropdown placeholder='Select Friend' fluid selection label='Book'
                                                       value={valueDropdown}
                                                       onChange={(e, items) => this.setState({valueDropdown: items.value})}
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
                                        : <Button primary floated='left' content='Save' onClick={this.handleSave.bind(this)}/>
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