import React, { Component }                                                 from 'react';
import { Button, Form, Grid, Header, Icon, Message, Popup, Segment } from 'semantic-ui-react';
import { Link }                                                             from "react-router-dom";

class SignUp extends Component {

    static route = {
        path     : '/sign-up',
        component: SignUp,
    };


    state = {
        name_user           : '',
        password            : '',
        re_enter_password   : '',
        email               : '',
        checkReEnterPassword: true
    };

    logChange(e) {
        this.setState({[e.target.name]: e.currentTarget.value});
    }

    render() {

        const {name_user, password, re_enter_password, email, checkReEnterPassword} = this.state;
        return (
            <div className='login-form' style={{marginTop: '5%'}}>
                <Grid
                    textAlign='center'
                    verticalAlign='middle'
                >
                    <Grid.Column style={{maxWidth: 450}}>
                        <Header as='h2' color='teal' textAlign='center'>
                            Log-in to your account
                        </Header>
                        <Form size='large'>
                            <Segment stacked>
                                <Form.Input
                                    fluid
                                    icon='user'
                                    iconPosition='left'
                                    placeholder='User Name'
                                    value={name_user}
                                    onChange={this.logChange.bind(this)}
                                    name='name_user'
                                />
                                <Form.Input type="password" fluid placeholder='Password'
                                            iconPosition='left'
                                            icon='lock'
                                            value={password}
                                            name='password' onChange={this.logChange.bind(this)}/>
                                <Form.Input type="password" fluid
                                            iconPosition='left'
                                            value={re_enter_password}
                                            placeholder='Re enter password'
                                            name='re_enter_password'
                                            icon={checkReEnterPassword ?
                                                <Icon name='check circle' link color='blue'
                                                      inverted/> : <Popup
                                                    trigger={<Icon name='remove circle' link color='red'
                                                                   inverted/>}
                                                    content={'Re enter password must be like password'}
                                                    position='top center'
                                                />}
                                />

                                <Form.Input
                                    value={email}
                                    fluid
                                    icon='mail'
                                    iconPosition='left'
                                    placeholder='Email'
                                    type='email'
                                    onChange={this.logChange.bind(this)}
                                    name='email'
                                />
                                <Link to={{
                                    pathname : '/input-code',
                                    name_user: name_user,
                                    password : password,
                                    email    : email

                                }}>
                                    <Button color='teal' fluid size='large'>Login</Button>
                                </Link>
                            </Segment>
                        </Form>
                        <Message>
                            You created account? <Link to='/login'>Login</Link>
                        </Message>
                    </Grid.Column>
                </Grid>
            </div>
        )
    }
}

export default SignUp;