import React, { Component }                                               from 'react';
import { Icon, Grid, Form, Card, Image, Button, Label, Message, Segment } from 'semantic-ui-react';
import default_avatar                                                     from '../../default_avatar.jpeg';
import './User.css';
import { ButtonLoading }                                                  from '../../lib';
import Borrower                                                           from "../Borrower/Borrower";
import { loginService }                                                   from "../../services";
import jwt                                                                from 'jsonwebtoken';


class EditUser extends Component {

    state = {
        user_name              : '',
        password               : '',
        role                   : '',
        re_enter_password      : '',
        email                  : '',
        checkReEnterPassword   : true,
        isLoading              : false,
        selectFile             : null,
        avatar                 : '',
        error_password         : false,
        error_re_enter_password: false,
        error_email            : false,
        file                   : '',
        oldPassword            : '',
        images                 : ''
    };

    static route = {
        path     : localStorage.getItem('token')
            ? '/edit-user/' + jwt.verify(localStorage.getItem('token'), 'sang').user_name
            : '/edit-user',
        component: localStorage.getItem('token') ? EditUser : Borrower,
        icon     : <Icon name='users'/>,
        className: 'user_management'
    };

    componentDidMount () {
        loginService.getUser(jwt.verify(localStorage.getItem('token'), 'sang').user_name)
            .then(res => {
                this.setState({
                    user_name  : res.data.user_name,
                    password   : res.data.password,
                    email      : res.data.email,
                    avatar     : res.data.avatar,
                    images     : res.data.images,
                    oldPassword: res.data.password
                })
            })
    }

    logChange (e) {
        this.setState({
            [ e.target.name ]: e.currentTarget.value,
            isLoading        : false
        });
    }

    handleChangeReEnterPassword (e) {
        if ( this.state.oldPassword !== this.state.password ) {
            this.setState({
                re_enter_password      : e.currentTarget.value,
                error_re_enter_password: e.currentTarget.value !== this.state.password,
                isLoading              : false
            });
        }

    }

    checkValidation () {
        let { password, email, oldPassword, re_enter_password } = this.state;
        if ( oldPassword !== password ) {
            this.setState({
                error_password         : !password.length,
                error_email            : !email,
                error_re_enter_password: password !== re_enter_password,
            });
        }

        else {
            this.setState({
                error_password: !password.length,
                error_email   : !email,
            });
        }
    }

    handleSaveUser () {
        let {
                error_email, error_password, oldPassword, re_enter_password,
                user_name, password, email, images
            } = this.state;
        this.checkValidation();
        this.setState({ isLoading: true });
        if ( ( error_email && error_password ) === false ) {
            if ( oldPassword !== password ) {
                if ( password === re_enter_password ) {
                    loginService.updateUser({
                        user_name: user_name,
                        password : password,
                        email    : email,
                        avatar   : images
                    }).then(() => window.location.href = '/');
                }
            }

            else {
                loginService.updateNotPass({
                    user_name: user_name,
                    email    : email,
                    avatar   : images
                })
                    .then(() => window.location.href = '/');
            }
            }
    }

    handleUploadImage () {
        this.inputElement.click();
    }

    handleSelectFile = (e) => {
        if ( e.target.files[ 0 ] ) {
            let reader       = new FileReader();
            let file         = e.target.files[ 0 ];
            reader.onloadend = () => {
                this.setState({
                    avatar: reader.result,
                    file  : file
                });
            };

            reader.readAsDataURL(file);
        }

    };

    render () {

        const {
                  user_name, password, re_enter_password,
                  email, isLoading,
                  checkReEnterPassword, avatar, error_email, error_password, error_re_enter_password
              } = this.state;

        return (
            <div>
                <Segment className={'content-profile'}>
                    <Message
                        attached
                        header={<Label size={'large'} color="green">Personal Setting</Label>}
                    />
                    <Form className={'attached fluid segment'}>
                        <Grid stackable>
                            <Grid.Row>
                                <Grid.Column width={11}>
                                    <Form.Group widths='equal'>
                                        <Form.Field>
                                            <Form.Input fluid label='User Name' placeholder='Rikky'
                                                        value={user_name} name='user_name'/>
                                        </Form.Field>
                                        <Form.Field>
                                            <Form.Input error={error_email} fluid label='Email'
                                                        name='email'
                                                        value={email}
                                                        placeholder='Rikky90' onChange={this.logChange.bind(this)}/>
                                            <p hidden={!error_email} style={{
                                                color   : 'red',
                                                fontSize: 12
                                            }}>Email must not null.</p>
                                        </Form.Field>
                                    </Form.Group>
                                    <Form.Group widths='equal'>
                                        <Form.Field>
                                            <Form.Input error={error_password} type="password" fluid label='Password'
                                                        placeholder='*********'
                                                        value={password}
                                                        name='password' onChange={this.logChange.bind(this)}/>
                                            <p hidden={!error_password} style={{
                                                color   : 'red',
                                                fontSize: 12
                                            }}>Password must not null.</p>
                                        </Form.Field>
                                        <Form.Field>
                                            <Form.Input error={error_re_enter_password} type="password" fluid
                                                        label='Re-enter password'
                                                        position='right'
                                                        value={re_enter_password}
                                                        placeholder='*********' name='re_enter_password'
                                                        icon={checkReEnterPassword ?
                                                            <Icon name='check circle' color='blue'
                                                                  inverted/> :
                                                            <Icon name='remove circle' color='red'
                                                                  inverted/>
                                                        }
                                                        onChange={this.handleChangeReEnterPassword.bind(this)}
                                            />
                                            <p hidden={!error_re_enter_password} style={{
                                                color   : 'red',
                                                fontSize: 12
                                            }}>Re enter password different password.</p>
                                        </Form.Field>
                                    </Form.Group>
                                </Grid.Column>
                                <Grid.Column width={5}>
                                    <Card>
                                        <Image src={avatar && avatar.length ? avatar : default_avatar}/>
                                        <input type='file' style={{ display: 'none' }}
                                               onChange={this.handleSelectFile.bind(this)}
                                               ref={input => this.inputElement = input} name="fileChoice"/>
                                        <Card.Content>
                                            <Button primary onClick={this.handleUploadImage.bind(this)}>Upload
                                                image</Button>
                                        </Card.Content>
                                    </Card>
                                </Grid.Column>
                                <Grid.Column>
                                    {isLoading ?
                                        <ButtonLoading text={'Save'}/>
                                        : <Button primary floated='left' content='Save'
                                                  onClick={this.handleSaveUser.bind(this)}>
                                        </Button>
                                    }
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                    </Form>
                </Segment>
            </div>
        )
    }
}

export default EditUser;