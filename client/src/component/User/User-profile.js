import React, { Component }                                               from 'react';
import { Icon, Grid, Form, Card, Image, Button, Label, Message, Segment } from 'semantic-ui-react';
import default_avatar                                                     from './default_avatar.jpeg';
import './User.css';
import { ButtonLoading }                                                  from '../../lib';
import Borrower                                                           from "../Borrower/Borrower";
import { loginService }                                                   from "../../services";

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
        error_user             : false,
        error_password         : false,
        error_re_enter_password: false,
        error_line_id          : false,
        file                   : ''
    };

    static route = {
        path     : '/edit-user/' + localStorage.getItem('user_name'),
        component: localStorage.getItem('user_name') ? EditUser : Borrower,
        icon     : <Icon name='users'/>,
        className: 'user_management'
    };

    componentDidMount() {
        loginService.getUser(localStorage.getItem('user_name'))
            .then(res => {
                this.setState({
                    user_name: res.data.user_name,
                    password : res.data.password,
                    email    : res.data.email,
                    avatar   : res.data.avatar
                })
            })
    }

    logChange(e) {
        this.setState({[e.target.name]: e.currentTarget.value});
    }

    handleChangeReEnterPassword(e) {
        if (e.currentTarget.value === this.state.password) {
            this.setState({
                checkReEnterPassword: true,
                re_enter_password   : e.currentTarget.value
            });
        }

        else {
            this.setState({
                checkReEnterPassword: false,
                re_enter_password   : e.currentTarget.value
            });
        }
    }

    checkValidation() {
        let {user_name, password, re_enter_password, email} = this.state;
        this.setState({
            error_user             : !user_name.length,
            error_password         : !password.length,
            error_re_enter_password: !(re_enter_password === password),
            error_line_id          : !email
        });
    }

    handleSaveUser(e) {
        e.preventDefault();
        this.checkValidation();
        this.setState({isLoading: true});
        loginService.postImage({files: this.state.file});
        console.log(this.state.file);
    }

    handleUploadImage() {
        this.inputElement.click();
    }

    handleSelectFile = (e) => {
        const data = new FormData();
        data.append('image', e.target.files[0], e.target.files[0].name);
        let reader       = new FileReader();
        let file         = e.target.files[0];
        reader.onloadend = () => {
            this.setState({avatar: reader.result});
        };

        reader.readAsDataURL(file);
    };

    render() {

        const {
                  user_name, password, re_enter_password,
                  email, isLoading,
                  checkReEnterPassword, avatar, error_line_id, error_password, error_user, error_re_enter_password
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
                                            <Form.Input error={error_user} fluid label='User Name' placeholder='Rikky'
                                                        value={user_name} name='user_name'
                                                        onChange={this.logChange.bind(this)}/>
                                            <p hidden={!error_user} style={{
                                                color   : 'red',
                                                fontSize: 12
                                            }}>User name must not null.</p>
                                        </Form.Field>
                                        <Form.Field>
                                            <Form.Input error={error_line_id} fluid label='LineID Synchronization'
                                                        name='email'
                                                        value={email}
                                                        placeholder='Rikky90' onChange={this.logChange.bind(this)}/>
                                            <p hidden={!error_line_id} style={{
                                                color   : 'red',
                                                fontSize: 12
                                            }}>LineID Synchronization must not null.</p>
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
                                        <Image src={avatar.length ? avatar : default_avatar}/>
                                        <input type='file' style={{display: 'none'}}
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