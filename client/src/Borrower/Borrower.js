import React, { Component }                                                       from 'react';
import {
    addBorrower, deleteBorrower, editBorrower, editChecked, getKeyWordBorrower,
    loadBorrower
}                                                                                 from "../middleware/borrower/actions";
import { connect }                                                                from 'react-redux';
import { Button, Card, Form, Grid, Header, Icon, Image, Modal, Segment } from 'semantic-ui-react'


const mapDispatchToProps = dispatch => {
    return {
        addBorrower: (name, id_book, date_return) => {
            dispatch(addBorrower(name, id_book, date_return));
        },

        loadBorrower: () => {
            dispatch(loadBorrower());
        },

        editChecked: (id, checked) => {
            dispatch(editChecked(id, checked));
        },

        editBorrower: (name, id_book, date_return, id, key) => {
            dispatch(editBorrower(name, id_book, date_return, id, key));
        },

        deleteBorrower: (borrowers) => {
            dispatch(deleteBorrower(borrowers));
        },

        getKeywordBorrower: (keyword) => {
            dispatch(getKeyWordBorrower(keyword));
        }
    }
};

const mapStateToProps = state => {
    return {
        borrowers: state.borrowerReducer,
    }
};


class Borrower extends Component {

    state = {
        name_user_detail  : '',
        email_detail      : '',
        book_detail       : '',
        date_return_detail: '',
        date_borrow_detail: '',
        modalOpen         : false
    };

    componentDidMount() {
        this.props.loadBorrower();
    }

    handleOpen(borrower) {
        this.setState({
            modalOpen         : true,
            name_user_detail  : borrower.user.user_name,
            email_detail      : borrower.user.email,
            book_detail       : borrower.book.title,
            date_return_detail: borrower.date_return,
            date_borrow_detail: borrower.date_borrow
        })
    }

    handleClose = () => this.setState({modalOpen: false});

    render() {

        return (
            <Card.Group>
                {this.props.borrowers.map((borrower, index) =>
                    <Card key={index}>
                        <Card.Content>
                            <Image floated='right' size='mini' src={borrower.book.images}/>
                            <Card.Header>
                                {borrower.user.user_name}
                            </Card.Header>
                            <Card.Meta>
                                {borrower.book.title}
                            </Card.Meta>
                            <Card.Description>
                                Date Return: <strong>{borrower.date_return}</strong>
                            </Card.Description>
                        </Card.Content>
                        <Card.Content extra>
                            <Modal
                                trigger={<div className='ui two buttons'>
                                    <Button basic color='green'
                                            onClick={() => this.handleOpen(borrower)}>Detail</Button>
                                </div>}
                                open={this.state.modalOpen}
                                onClose={this.handleClose.bind(this)}
                                basic
                                size='small'
                            >
                                <Modal.Content>
                                    <div className='login-form'>
                                        <style>{`body > div,
                                                          body > div > div,
                                                          body > div > div > div.login-form {
                                                            height: 100%;}`
                                        }
                                        </style>
                                        <Grid
                                            textAlign='center'
                                            style={{height: '100%'}}
                                            verticalAlign='middle'
                                        >
                                            <Grid.Column style={{maxWidth: 450}}>
                                                <Header as='h2' color='teal' icon='sign in' content='BORROWER'/>
                                                <Form size='large'>
                                                    <Segment stacked>
                                                        <Form.Input
                                                            fluid
                                                            icon='user'
                                                            iconPosition='left'
                                                            value={this.state.name_user_detail}
                                                            disable
                                                        />
                                                        <Form.Input
                                                            fluid
                                                            icon='mail'
                                                            iconPosition='left'
                                                            value={this.state.email_detail}
                                                            disable
                                                        />

                                                        <Form.Input
                                                            fluid
                                                            icon='date'
                                                            iconPosition='left'
                                                            value={this.state.date_borrow_detail}
                                                            disable
                                                        />
                                                        <Form.Input
                                                            fluid
                                                            icon='date'
                                                            iconPosition='left'
                                                            value={this.state.date_return_detail}
                                                            disable
                                                        />
                                                    </Segment>
                                                </Form>
                                            </Grid.Column>
                                        </Grid>
                                    </div>
                                </Modal.Content>
                                <Modal.Actions>
                                    <Button color='green' onClick={this.handleClose.bind(this)} inverted>
                                        <Icon name='checkmark'/> Got it
                                    </Button>
                                </Modal.Actions>
                            </Modal>
                        </Card.Content>
                    </Card>
                )}
            </Card.Group>
        )
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Borrower);