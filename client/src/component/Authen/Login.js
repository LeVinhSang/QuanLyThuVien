import React, { Component }                             from 'react';
import { Button, Form, Grid, Header, Message, Segment } from 'semantic-ui-react';
import { Link }                                         from "react-router-dom";
import { loginService }                                 from '../../services';

class Login extends Component {


    static route = {
        path     : '/login',
        component: Login,
    };

    state = {
        user_name       : '',
        password        : '',
        modalCodeConfirm: false
    };

    logChange(e) {
        this.setState({[e.target.name]: e.currentTarget.value});
    }

    handleLogin(e) {
        let {user_name, password} = this.state;
        e.preventDefault();
        loginService.loginForm({
            user_name: user_name,
            password : password
        })
            .then(res => {
                if (res.data.message === 'login false') {
                    alert('user_name or password wrong!');
                }
                else {
                    localStorage.setItem('token', res.data);
                    window.location.href = '/';
                }
            });
    }

    render() {

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
                                    placeholder='E-mail address'
                                    name='user_name'
                                    onChange={this.logChange.bind(this)}
                                />
                                <Form.Input
                                    fluid
                                    icon='lock'
                                    iconPosition='left'
                                    placeholder='Password'
                                    type='password'
                                    name='password'
                                    onChange={this.logChange.bind(this)}
                                />

                                <Button color='teal' fluid size='large'
                                        onClick={this.handleLogin.bind(this)}>Login</Button>
                            </Segment>
                        </Form>
                        <Message>
                            You not account? <Link to='/sign-up'>Sign Up</Link>
                        </Message>
                    </Grid.Column>
                </Grid>
            </div>
        )
    }
}

export default Login;