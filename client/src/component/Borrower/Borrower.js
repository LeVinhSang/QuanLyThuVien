import React, { Component }                                                from 'react';
import { Button, Card, Divider, Icon, Image, Input, Modal, Popup } from "semantic-ui-react";
import { borrowerService }                                                 from '../../services/index';
import Notification                                                        from "../Notification/Notification";

class Borrower extends Component {

    static route = {
        path     : '/',
        component: Borrower,
        icon     : <Icon name='home'/>,
        linkLabel: 'Borrowers',
        className: 'Borrowers'
    };

    state = {
        borrowers     : [],
        borrowerSearch: [],
        open: true
    };

    close = () => this.setState({ open: false });

    componentDidMount() {
        borrowerService.deleteOutBorrowed().then( () => {
            borrowerService.getBorrowers().then(res => {
                this.setState({
                    borrowers     : res.data,
                    borrowerSearch: res.data
                })
            });
        });

    }

    onChangeInputSearch(e) {
        let updatedList = this.state.borrowers;
        updatedList = updatedList.filter( item =>
            item.user.user_name.toLowerCase().search(e.currentTarget.value.toLowerCase()) !== -1);
        this.setState({borrowerSearch: updatedList});
    }

    render() {

        return (
            <div>
                <Modal open={this.state.open} onClose={this.close}>
                    <Modal.Header>Notification from Library</Modal.Header>
                    <Modal.Content image>
                        <Image wrapped size='medium' src='/assets/images/avatar/large/rachel.png' />
                        <Modal.Description>
                            <Notification/>
                        </Modal.Description>
                    </Modal.Content>
                </Modal>

                <h4>Total: {this.state.borrowers.length}</h4>
                <div>
                    <Input style={{width: '300px'}} icon='search' placeholder='Search....' size='mini'
                           onChange={this.onChangeInputSearch.bind(this)}/>
                </div>
                <Divider inverted hidden/>
                <Card.Group>
                    {this.state.borrowerSearch.map((borrower, index) =>
                        <Card key={index} style={{width: 200}}>
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
                                <div className='ui two buttons'>
                                    <Popup
                                        on='click'
                                        hideOnScroll
                                        trigger={<Button content={'Detail'} basic color='green'/>}
                                        content={<div>
                                            Detail: .....
                                            <br/>
                                            Email: {borrower.user.email}
                                            <br/>
                                            Date borrow: {borrower.date_borrow}
                                        </div>}
                                    />
                                </div>
                            </Card.Content>
                        </Card>
                    )}
                </Card.Group>
            </div>
        )
    }
}

export default Borrower;