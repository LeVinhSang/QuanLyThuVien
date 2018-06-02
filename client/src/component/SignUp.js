import React, { Component }                             from 'react';
import { Button, Form, Grid, Header, Message, Segment } from 'semantic-ui-react';
import { Link }                                         from "react-router-dom";

class SignUp extends Component {

    static route = {
        path     : '/sign-up',
        component: SignUp,
    };


    state = {
        name_user        : '',
        password         : '',
        re_enter_password: '',
        email            : '',
        avatar           : ''
    };

    logChange(e) {
        this.setState({[e.target.name]: e.currentTarget.value});
    }

    render() {

        const {name_user, password, re_enter_password, email, avatar} = this.state;

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
                                <Form.Input
                                    fluid
                                    value={password}
                                    icon='lock'
                                    iconPosition='left'
                                    placeholder='Password'
                                    type='password'
                                    onChange={this.logChange.bind(this)}
                                    name='password'
                                />

                                <Form.Input
                                    value={re_enter_password}
                                    fluid
                                    icon='lock'
                                    iconPosition='left'
                                    placeholder='re_enter_password'
                                    type='password'
                                    onChange={this.logChange.bind(this)}
                                    name='re_enter_password'
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

                                <Form.Input
                                    value={avatar}
                                    fluid
                                    icon='linkify'
                                    iconPosition='left'
                                    placeholder='Link Avatar'
                                    type='text'
                                    onChange={this.logChange.bind(this)}
                                    name='avatar'
                                />


                                <Button color='teal' fluid size='large'>Login</Button>
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