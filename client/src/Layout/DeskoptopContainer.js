import PropTypes from 'prop-types'
import React, { Component } from 'react';
import {
    Button, Container, Form, Grid, Header, Icon, Menu, Message, Modal,
    Responsive, Segment, Visibility, Dropdown, Input, Label, Popup, Image
} from 'semantic-ui-react';

import {connect}                          from 'react-redux';
import {addUser, login, sendCode, signUp} from "../middleware/user/actions";

const HomepageHeading = ({ mobile }) => (
    <Container text>
        <Header
            as='h1'
            content='Digital  Library'
            inverted
            style={{
                fontSize: mobile ? '2em' : '4em',
                fontWeight: 'normal',
                marginBottom: 0,
                marginTop: mobile ? '1.5em' : '3em',
            }}
        />
        <Header
            as='h2'
            content='Do whatever you want when you want to.'
            inverted
            style={{
                fontSize: mobile ? '1.5em' : '1.7em',
                fontWeight: 'normal',
                marginTop: mobile ? '0.5em' : '1.5em',
            }}
        />
        <Button primary size='huge'>
            Get Started
            <Icon name='right arrow' />
        </Button>
    </Container>
);

HomepageHeading.propTypes = {
    mobile: PropTypes.bool,
};


const mapDispatchToProps = dispatch => {
    return {
        sendCode: (email, code) => {
            dispatch(sendCode(email, code));
        },

        addUser: (user_name, password, email, avatar) => {
            dispatch(addUser(user_name, password, email, avatar));
        },

        login: (user_name, password) => {
            dispatch(login(user_name, password));
        },

        signUp: (user_name) => {
            dispatch(signUp(user_name));
        }
    }
};

const mapStateToProps = state => {
    return {
        users: state.userReducer
    };
};

class DesktopContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            modalOpen: false,
            modalOpenSignUp: false,
            modalCodeConfirm: false,
            name_user:'',
            name_user_login:'',
            password_login:'',
            password:'',
            email: '',
            avatar:'',
            codeConfirm: 0,
            label: false,
            code: 0,
            label_check: false,
            isOpenPopup: false
        };
    }

    handleOpen = () => this.setState({ modalOpen: true , modalOpenSignUp: false});

    handleOpenSignUp = () => this.setState({ modalOpenSignUp: true, modalOpen:false });

    handleClose = () => this.setState({ modalOpen: false });

    handleCloseSignUp = () => this.setState({ modalOpenSignUp: false, label_check: false });

    handleCloseCodeConfirm = () => this.setState({ modalCodeConfirm: false, label: false });

    hideFixedMenu = () => this.setState({ fixed: false });

    showFixedMenu = () => this.setState({ fixed: true });

    logChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    inputSignUpChange(value) {
        this.setState({name_user: value});
        this.props.signUp(value);
    }

    handleSignUpClick(e) {
        e.preventDefault();

        if(this.state.name_user === '' || this.state.password === '' || this.state.email === '') {
            this.setState({label_check: true});
        }

        else {
            let rand = 100000 + Math.floor(Math.random() * 899999);
            this.props.sendCode(this.state.email, rand);
            this.setState({
                modalCodeConfirm: true,
                modalOpenSignUp: false,
                codeConfirm: rand,
                label: false,
                label_check: false,
            })
        }
    }


    handleLogin(e) {
        e.preventDefault();
        this.props.login(this.state.name_user_login, this.state.password_login);
    }

    handleSubmitCode(e) {
        e.preventDefault();
        if(this.state.codeConfirm !== Number(this.state.code)) {
            this.setState({label: true})
        }

        else {
            this.props.addUser(this.state.name_user, this.state.password, this.state.email, this.state.avatar)
            this.setState({modalCodeConfirm: false})
        }
    }

    isAuthenticated = () => {
        const user = localStorage.getItem('user_name');
        if(user) {
            return true
        }
    };

    handleLogout = () => {
        localStorage.removeItem("user_name");
        localStorage.removeItem('avatar');
        localStorage.removeItem('email');
        this.setState({isOpenPopup: false, modalOpen: false});
    };

    render() {

        function isLoginAuthenticated() {
            const check = localStorage.getItem('message');
            if(check) {
                return true
            }
        };

        const { children } = this.props;
        const { fixed } = this.state;
        const avatar = localStorage.getItem('avatar');
        const label_check_true = (
            <Label basic color='red' pointing='below'>Values ​​are not empty</Label>
        );

        const modal = (
            <div>
                <Modal
                    trigger={<Button inverted={!fixed} primary={fixed} onClick={this.handleOpen.bind(this)}>Login</Button>}
                    open={this.state.modalOpen}
                    onClose={this.handleClose.bind(this)}
                    basic
                    size='small'
                >
                    <Modal.Content>
                        <div className='login-form'>
                            <style>{`body > div,
                                                          body > div > div,
                                                          body > div > div > div.login-form {
                                                            height: 100%;}`
                            }
                            </style>
                            <Grid
                                textAlign='center'
                                style={{ height: '100%' }}
                                verticalAlign='middle'
                            >
                                <Grid.Column style={{ maxWidth: 450 }}>
                                    <Header as='h2' color='teal' icon='sign in' content='LOGIN' />
                                    <Form size='large'>
                                        <Segment stacked>
                                            <Form.Input
                                                fluid
                                                iconPosition='left'
                                                placeholder='User Name'
                                                name='name_user_login'
                                                onChange={this.logChange.bind(this)}
                                            />
                                            <Form.Input
                                                fluid
                                                icon='lock'
                                                iconPosition='left'
                                                placeholder='Password'
                                                type='password'
                                                onChange={this.logChange.bind(this)}
                                                name='password_login'
                                            />
                                            <Button color='teal' fluid size='large' onClick={this.handleLogin.bind(this)}>Login</Button>
                                        </Segment>
                                    </Form>
                                    <Message>
                                        New to us? <a onClick={this.handleOpenSignUp.bind(this)}>Sign Up</a>
                                    </Message>
                                </Grid.Column>
                            </Grid>
                        </div>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button color='green' onClick={this.handleClose.bind(this)} inverted>
                            <Icon name='checkmark' /> Got it
                        </Button>
                    </Modal.Actions>
                </Modal>
                <Modal
                    trigger={<Button inverted={!fixed} primary={fixed} style={{ marginLeft: '0.5em' }} onClick={this.handleOpenSignUp.bind(this)}>Sign Up</Button>}
                    open={this.state.modalOpenSignUp}
                    onClose={this.handleCloseSignUp.bind(this)}
                    basic
                    size='small'
                >
                    <Modal.Content>
                        <div className='login-form'>
                            <style>{`body > div,
                                                          body > div > div,
                                                          body > div > div > div.login-form {
                                                            height: 100%;}`
                            }
                            </style>
                            <Grid
                                textAlign='center'
                                style={{ height: '100%' }}
                                verticalAlign='middle'
                            >
                                <Grid.Column style={{ maxWidth: 450 }}>
                                    <Header as='h2' color='teal' icon='sign in' content='SIGN UP' />
                                    <Form size='large'>
                                        <Segment stacked>
                                            {this.state.label_check ? label_check_true : ''}
                                            <Form.Input
                                                fluid
                                                icon='user'
                                                iconPosition='left'
                                                placeholder='User Name'
                                                onChange={ (e) => this.inputSignUpChange(e.target.value)}
                                                name='name_user'
                                                loading
                                            />
                                            <Form.Input
                                                fluid
                                                icon='lock'
                                                iconPosition='left'
                                                placeholder='Password'
                                                type='password'
                                                onChange={this.logChange.bind(this)}
                                                name='password'
                                            />

                                            <Form.Input
                                                fluid
                                                icon='mail'
                                                iconPosition='left'
                                                placeholder='Email'
                                                type='email'
                                                onChange={this.logChange.bind(this)}
                                                name='email'
                                            />

                                            <Form.Input
                                                fluid
                                                icon='linkify'
                                                iconPosition='left'
                                                placeholder='Link Avatar'
                                                type='text'
                                                onChange={this.logChange.bind(this)}
                                                name='avatar'
                                            />

                                            {isLoginAuthenticated() ? <Button color='teal' fluid size='large' disabled>Sign Up</Button>
                                                : <Button color='teal' fluid size='large' onClick={this.handleSignUpClick.bind(this)}>Sign Up</Button>}
                                        </Segment>
                                    </Form>
                                    <Message>
                                        You created account? <a onClick={this.handleOpen.bind(this)}>Login</a>
                                    </Message>
                                </Grid.Column>
                            </Grid>
                        </div>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button color='green' onClick={this.handleCloseSignUp.bind(this)} inverted>
                            <Icon name='checkmark' /> Got it
                        </Button>
                    </Modal.Actions>
                </Modal>
            </div>
        );


        const userEditor = (
            <Menu vertical>
                <Menu.Item link><Icon name='edit'/>Chang Password</Menu.Item>
                <Menu.Item link><Icon name='edit'/>Change Email</Menu.Item>
                <Menu.Item link><Icon name='edit'/>Change Avatar</Menu.Item>
                <Menu.Item link onClick={this.handleLogout.bind(this)}><Icon name='log out'/>Log Out</Menu.Item>
            </Menu>
        );

        const avatarPopover = (
            <Popup
                trigger={<Image avatar src={avatar}/>}
                content={userEditor}
                on='click'
                position='bottom center'
            />
        );

        return (
            <Responsive {...Responsive.onlyComputer}>
                <Visibility once={false} onBottomPassed={this.showFixedMenu} onBottomPassedReverse={this.hideFixedMenu}>
                    <Segment inverted textAlign='center' style={{ minHeight: 700, padding: '1em 0em'}} vertical>
                        <Menu
                            fixed={fixed ? 'top' : null}
                            inverted={!fixed}
                            pointing={!fixed}
                            secondary={!fixed}
                            size='large'
                        >
                            <Container>
                                <Menu.Item active>Home</Menu.Item>
                                <Menu.Item>Borrowers</Menu.Item>
                                <Menu.Item>Books</Menu.Item>
                                <Menu.Item position={'right'}>
                                    <Input
                                        action={
                                            <Dropdown button floating options={
                                                [{ key: 'Borrowers', text: 'Borrowers', value: 'Borrowers' },
                                                    { key: 'Books', text: 'Books', value: 'Books' }]
                                            } defaultValue='Borrowers' />
                                        }
                                        icon='search'
                                        iconPosition='left'
                                        placeholder='Search...'
                                    />
                                </Menu.Item>
                                <Menu.Item position='right'>
                                    {this.isAuthenticated() ? avatarPopover : modal}
                                </Menu.Item>

                                <Modal
                                    open={this.state.modalCodeConfirm}
                                    onClose={this.handleCloseCodeConfirm.bind(this)}
                                    basic
                                    size='small'
                                >
                                    <Modal.Content>
                                        <div className='login-form'>
                                            <style>{`body > div,
                                                          body > div > div,
                                                          body > div > div > div.login-form {
                                                            height: 100%;}`
                                            }
                                            </style>
                                            <Grid
                                                textAlign='center'
                                                style={{ height: '100%' }}
                                                verticalAlign='middle'
                                            >
                                                <Grid.Column style={{ maxWidth: 450 }}>
                                                    <Header as='h2' color='teal' icon='sign in' content='LOGIN' />
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
                                                            <Button color='teal' fluid size='large' onClick={this.handleSubmitCode.bind(this)}>Submit</Button>
                                                        </Segment>
                                                    </Form>
                                                    <Message>
                                                        Send to code? <a onClick={this.handleSignUpClick.bind(this)}>Send Again</a>
                                                    </Message>
                                                </Grid.Column>
                                            </Grid>
                                        </div>
                                    </Modal.Content>
                                    <Modal.Actions>
                                        <Button color='green' onClick={this.handleCloseCodeConfirm.bind(this)} inverted>
                                            <Icon name='checkmark' /> Got it
                                        </Button>
                                    </Modal.Actions>
                                </Modal>
                            </Container>
                        </Menu>
                        <HomepageHeading />
                    </Segment>
                </Visibility>

                {children}
            </Responsive>
        )
    }
}

DesktopContainer.propTypes = {
    children: PropTypes.node,
};

export default DesktopContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(DesktopContainer);