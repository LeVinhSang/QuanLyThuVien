import React, { Component }             from 'react';
import Borrower                         from "../Borrower/Borrower";
import jwt                              from 'jsonwebtoken';
import { Button, Form, Icon, TextArea } from "semantic-ui-react";
import { notificationService }          from "../../services";

class NotificationManagement extends Component {

    static route = {
        path     : '/notification-management',
        component: localStorage.getItem('token') ?
            jwt.verify(localStorage.getItem('token'), 'sang').role === 'admin' && NotificationManagement : Borrower,
        icon     : <Icon name='user'/>,
        linkLabel: localStorage.getItem('token') ?
            jwt.verify(localStorage.getItem('token'), 'sang').role === 'admin' && 'Notification Management' : null,
        className: 'borrower_management'
    };

    state = { info: '' };

    logChange (e) {
        this.setState({ info: e.currentTarget.value });
    }

    handleSave () {
        notificationService.addNotification(this.state.info).then(() => {
            window.location.href = '/';
        })
    }

    render () {

        return (
            <div>
                <h4>Add Notification</h4>
                <Form>
                    <Form.Group widths='equal'>
                        <Form.Field control={TextArea} label='Information' placeholder='Input information'
                                    onChange={this.logChange.bind(this)}/>
                    </Form.Group>

                    <Button primary content={'Save'} onClick={this.handleSave.bind(this)}/>
                </Form>
            </div>
        );
    }
}

export default NotificationManagement;
