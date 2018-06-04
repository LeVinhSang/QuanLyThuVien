import React, { Component }                                          from 'react';
import { Button, Form, Grid, Header, Label, Message, Segment } from 'semantic-ui-react';
import { loginService }                                              from "../../services";

class InputCode extends Component {

    static route = {
        path     : '/input-code',
        component: InputCode,
    };


    state = {
        code : '',
        rand : '',
        label: false
    };

    componentDidMount() {
        this.handleSendCode()
    }

    logChange(e) {
        this.setState({[e.target.name]: e.currentTarget.value});
    }

    handleSubmitCode() {
        let {code, rand} = this.state;
        if (rand !== Number(code)) {
            this.setState({label: true});
        }
    }
    ;

    handleSendCode() {
        let rand = 100000 + Math.floor(Math.random() * 899999);
        this.setState({rand: rand});
        const {email} = this.props.location;
        loginService.sendCodeConfirm({
            email: email,
            code : rand
        });
    }

    render() {

        return (
            <div className='login-form'>
                <Grid
                    textAlign='center'
                    style={{height: '100%'}}
                    verticalAlign='middle'
                >
                    <Grid.Column style={{maxWidth: 450}}>
                        <Header as='h2' color='teal' icon='sign in' content='INPUT CODE'/>
                        <Form size='large'>
                            <Segment stacked>
                                <Label basic color='red' pointing='below'>
                                    {this.state.label ? 'Code wrong input again!' : 'We sent for you code in your email. Please check email and input code.'}
                                </Label>
                                <Form.Input
                                    type='number'
                                    fluid
                                    icon='barcode'
                                    iconPosition='left'
                                    placeholder='Input Code Confirm'
                                    name='code'
                                    onChange={this.logChange.bind(this)}
                                />
                                <Button color='teal' fluid size='large'
                                        onClick={this.handleSubmitCode.bind(this)}>Submit</Button>
                            </Segment>
                        </Form>
                        <Message>
                            Send to code? <a onClick={this.handleSendCode.bind(this)}>Send
                            Again</a>
                        </Message>
                    </Grid.Column>
                </Grid>
            </div>
        )
    }
}

export default InputCode;