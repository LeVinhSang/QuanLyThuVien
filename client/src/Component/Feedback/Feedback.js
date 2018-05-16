import React, {Component} from 'react';
import {Input, Form, Row, Icon} from 'antd';

export default class Feedback extends Component {
    render() {
        return(
            <div>
                <div style={{backgroundColor:'#424242', height:10}}/>
                <div style={{backgroundColor:'#424242', height:30}}>
                    <h3 style={{marginLeft:10, color:'white'}}>Feedback</h3>
                </div>
                <Form className="ant-advanced-search-form" style={{backgroundColor:'white'}}>
                    <Row>{this.getFields()}</Row>
                    <Row>
                        <div style={{ textAlign: 'right' }}>
                            <a style={{ marginLeft: 8, fontSize: 12 }} onClick={this.toggle}>
                                Collapse <Icon type={this.state.expand ? 'up' : 'down'} />
                            </a>
                        </div>
                    </Row>
                    <Row>
                        <Input.Search placeholder="Please Login Before comment" enterButton="Login"/>
                    </Row>
                </Form>
            </div>
        )
    }
}