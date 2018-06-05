import React, { Component }                                          from 'react';
import { Button, Form, Grid, Header, Icon, Message, Popup, Segment } from 'semantic-ui-react';
import { Link }                                                      from "react-router-dom";
import { loginService }                                              from "../../services";

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
        checkReEnterPassword: true,
        disabledButton      : true,
        error_user          : true,
        error_password      : true,
        error_email         : true,
        error_re_password   : true
    };

    logChange(e) {

        let {name_user, password, re_enter_password, email, error_user} = this.state;
        this.setState({[e.target.name]: e.currentTarget.value});

        if (name_user !== '' && password !== '' && (re_enter_password === password) && email !== '' && error_user === false) {
            this.setState({
                disableButton: false
            });
        }

    }

    inputUserNameChange(e) {
        this.setState({name_user: e.currentTarget.value});
        e.currentTarget.value.length && loginService.checkSignUp(e.currentTarget.value)
            .then(res => {
                if (res.data.message === 'user name existed') {
                    this.setState({
                        error_user    : true,
                        disabledButton: true
                    });
                }

                else {
                    this.setState({error_user: false});
                }
            });
    }

    reEnterPassword(e) {

        let {name_user, password, re_enter_password, email, error_user} = this.state;

        this.setState({
            re_enter_password   : e.currentTarget.value,
            checkReEnterPassword: re_enter_password !== password
        });

        if (name_user !== '' && password !== '' && (re_enter_password === password) && email !== '' && error_user === true) {
            this.setState({
                disableButton: false
            });
        }
    }

    handleSignCLick() {
        let {name_user, password, re_enter_password, email} = this.state;

        if(name_user === '') {
            this.setState({error_user: false});
        }
        this.setState({error_password: password.length});

        this.setState({error_re_password: (re_enter_password === password)});

        this.setState({error_email: email.length});
    }

    render() {

        let {
                name_user, password, re_enter_password, email, checkReEnterPassword, disabledButton,
                error_user, error_password, error_email, error_re_password
            } = this.state;

        if (name_user !== '' && password !== '' && (re_enter_password === password) && email !== '' && error_user === true) {
            disabledButton = false;
        }

        return (
            <div className='login-form' style={{marginTop: '5%'}}>
                <Grid
                    textAlign='center'
                    verticalAlign='middle'
                >
                    <Grid.Column style={{
                        maxWidth : 450,
                        textAlign: 'left'
                    }}>
                        <Header as='h2' color='teal'>
                            Log-in to your account
                        </Header>
                        <Form size='large'>
                            <Segment>
                                <Form.Field>
                                    <Form.Input
                                        fluid
                                        error={!error_user}
                                        icon='user'
                                        iconPosition='left'
                                        placeholder='User Name'
                                        value={name_user}
                                        onChange={this.inputUserNameChange.bind(this)}
                                        name='name_user'
                                    />
                                    <p hidden={error_user} style={{
                                        color   : 'red',
                                        fontSize: 12
                                    }}>User name null or existed.</p>
                                </Form.Field>
                                <Form.Field>
                                    <Form.Input
                                        type="password"
                                        error={!error_password}
                                        fluid
                                        placeholder='Password'
                                        iconPosition='left'
                                        icon='lock'
                                        value={password}
                                        name='password' onChange={this.logChange.bind(this)}
                                    />
                                    <p hidden={error_password} style={{
                                        color   : 'red',
                                        fontSize: 12
                                    }}>Password must not null.</p>
                                </Form.Field>
                                <Form.Field>
                                    <Form.Input
                                        error={!error_re_password}
                                        type="password"
                                        fluid
                                        iconPosition='left'
                                        value={re_enter_password}
                                        onChange={this.reEnterPassword.bind(this)}
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
                                    <p hidden={error_re_password} style={{
                                        color   : 'red',
                                        fontSize: 12
                                    }}>Re enter password different password.</p>

                                </Form.Field>
                                <Form.Field>
                                    <Form.Input
                                        error={!error_email}
                                        value={email}
                                        fluid
                                        icon='mail'
                                        iconPosition='left'
                                        placeholder='Email'
                                        type='email'
                                        onChange={this.logChange.bind(this)}
                                        name='email'
                                    />
                                    <p hidden={error_email} style={{
                                        color   : 'red',
                                        fontSize: 12
                                    }}>Email must not null.</p>
                                </Form.Field>
                                {disabledButton ?
                                    <Button color='teal' fluid size='large'
                                            onClick={this.handleSignCLick.bind(this)}>Sign Up</Button>
                                    :
                                    <Link to={{
                                        pathname : '/input-code',
                                        name_user: name_user,
                                        password : password,
                                        email    : email

                                    }}>
                                        <Button color='teal' fluid size='large'>Sign Up</Button>
                                    </Link>
                                }
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