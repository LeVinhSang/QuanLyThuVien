import React, { Component }    from 'react';
import { notificationService } from '../../services'
import { Divider }             from "semantic-ui-react";


class Notification extends Component {

    state = { notifications: [] };

    componentDidMount () {
        notificationService.getNotifications().then(res => this.setState({ notifications: res.data }));
    }

    render () {
        return (
            <div>
                {this.state.notifications.map((data, index) =>
                    <div key={index}>
                        {data.info}
                        <Divider/>
                    </div>
                )}
            </div>
        )
    }
}

export default Notification;
