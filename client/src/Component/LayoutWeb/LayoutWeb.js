import React from 'react';
import PropTypes from 'prop-types';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import IconButton from '@material-ui/core/IconButton';
import Hidden from '@material-ui/core/Hidden';
import Divider from '@material-ui/core/Divider';
import MenuIcon from '@material-ui/icons/Menu';
import Router from "../../Route/Route";
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import BookIcon from '@material-ui/icons/Book';
import HomeIcon from '@material-ui/icons/Home';
import {Link} from 'react-router-dom';
import logo from '../../logo.svg';
import '../../App.css';
import Timer from "../Timer";
import {Input, Select, Form, Row, Icon, Popover, Modal, Checkbox} from 'antd';
import {getKeyWordBorrower, loadBorrower} from "../../middleware/borrower/actions";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {getKeyWordBook, loadBook} from "../../middleware/book/actions";
import {StepLabel, Step, Stepper, Avatar, Button, ListItemIcon, ListItemText, withStyles} from '@material-ui/core';

const drawerWidth = 220;

const styles = theme => ({
    root: {
        flexGrow: 1,
        height: 'auto',
        zIndex: 1,
        overflow: 'hidden',
        position: 'relative',
        display: 'flex',
        width: '100%',
    },
    appBar: {
        position: 'fixed',
        marginLeft: drawerWidth,
        [theme.breakpoints.up('md')]: {
            width: `calc(100% - ${drawerWidth}px)`
        }
    },
    navIconHide: {
        [theme.breakpoints.up('md')]: {
            display: 'none',
        },
    },
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
        width: drawerWidth,
        [theme.breakpoints.up('md')]: {
            position: 'fixed',
        },
    },
    content: {
        flexGrow: 1,
        backgroundColor:'#424242',
        padding: theme.spacing.unit * 3,
        [theme.breakpoints.up('md')]: {
            marginLeft:`calc(${drawerWidth}px)`,
        },
    },

    menuItem: {
        '&:focus': {
            backgroundColor: theme.palette.primary.main,
            '& $primary, & $icon': {
                color: theme.palette.common.white,
            },
        },
    },
    flex: {
        flex: 1,
    },
    primary: {},
    icon: {},
});


const mapDispatchToProps = dispatch => {
    return {
        loadBorrower: () => {
            dispatch(loadBorrower());
        },

        keywordBorrower: (keyword) => {
            dispatch(getKeyWordBorrower(keyword));
        },

        loadBook: () => {
            dispatch(loadBook());
        },

        keywordBook: (keyword) => {
            dispatch(getKeyWordBook(keyword));
        }
    }
};

const mapStateToProps = state => {
    return {
        completes: state.autoCompleteReducer,
        borrowers: state.borrowerReducer,
        books: state.bookReducer
    }
};


function getSteps() {
    return ['Create Account', 'Input Code Confirm', 'Success'];
}

class LayoutWeb extends React.Component {
    state = {
        mobileOpen: false,
        forWhat:'Borrowers',
        visible: false,
        visibleSignUp: false,
        activeStep: 0,
    };

    onSearchInput(keyword, forWhat) {
        if(keyword === '' && forWhat === 'Borrowers') {
            this.props.loadBorrower();
        }

        else if(keyword !== '' && forWhat === 'Borrowers') {
            this.props.keywordBorrower(keyword)
        }

        else if(keyword === '' && forWhat === 'Books') {
            this.props.loadBook();
        }

        else if(keyword !== '' && forWhat === 'Books') {
            this.props.keywordBook(keyword);
        }

    }

    /*---------------Drawer------------------------------*/

    handleDrawerToggle = () => {
        this.setState({ mobileOpen: !this.state.mobileOpen });
    };

    menuClick = () => {
        this.setState({mobileOpen: false})
    };

    toggle = () => {
        const { expand } = this.state;
        this.setState({ expand: !expand });
    };

    onSelectChange = value => {
        this.setState({forWhat: value});
    };

    /*-----------------FeedBack----------------------*/

    getFields() {
        const count = this.state.expand ? 10 : 6;
        const children = [];
        for (let i = 0; i < 10; i++) {
            children.push(
                <div key={i} style={{ display: i < count ? 'block' : 'none' }}>
                    <label>hhaa</label>
                    <input/>
                </div>
            );
        }
        return children;
    }

    /*------------------Modal Login-----------------------*/
    showModal = () => {
        this.setState({
            visible: true,
        });
    };
    handleOk = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err) => {
            if (!err) {
                this.setState({
                    visible: false,
                });
            }
        });
    };
    handleCancel = () => {
        this.setState({
            visible: false,
        });
    };

    /*-------------------Modal Sign up--------------------------*/

    showModalSignUp = () => {
        this.setState({
            visibleSignUp: true,
        });
    };

    handleCancelSignUp = () => {
        this.setState({
            visibleSignUp: false,
        });
    };

    /*--------------------Step Material Ui-------------------*/

    handleNext = () => {
        const { activeStep } = this.state;
        this.setState({
            activeStep: activeStep + 1,
        });
    };

    handleBack = () => {
        const { activeStep } = this.state;
        this.setState({
            activeStep: activeStep - 1,
        });
    };


    render() {
        const { classes, theme } = this.props;
        const self = this;
        const steps = getSteps();
        const { activeStep } = this.state;
        const drawer = (
            <div>
                <div className={classes.toolbar}>
                    <img src={logo} className={'App-logo'} alt=""/>
                    <b style={{fontSize:'large', color:'blue'}}>Digital Library</b>
                    <div style={{color:'blue', marginLeft:'15px'}}>
                        <Timer/>
                    </div>
                </div>
                <Divider />
                <List>
                    <MenuList>
                        <Link to={'/'}>
                            <MenuItem className={classes.menuItem} onClick={this.menuClick.bind(this)}>
                                <ListItemIcon className={classes.icon}>
                                    <HomeIcon />
                                </ListItemIcon>
                                <ListItemText classes={{ primary: classes.primary }} inset primary="Home" />
                            </MenuItem>
                        </Link>

                        <Link to={'/books'}>
                            <MenuItem className={classes.menuItem} onClick={this.menuClick.bind(this)}>
                                <ListItemIcon className={classes.icon}>
                                    <BookIcon />
                                </ListItemIcon>
                                <ListItemText classes={{ primary: classes.primary }} inset primary="Manager" />
                            </MenuItem>
                        </Link>
                    </MenuList>
                </List>
            </div>
        );

        const text = <span>Title</span>;
        const content = (
            <div>
                <p>Content</p>
                <p>Content</p>
            </div>
        );

        const ButtonSignUp = (
            <Button color="inherit" className={classes.button} onClick={this.showModalSignUp}>
                Sign Up
            </Button>
        );

        const ButtonLogin = (
            <Button color="inherit" className={classes.button} onClick={this.showModal}>
                Login
            </Button>
        );

        const User = (
            <Popover placement="leftTop" title={text} content={content} trigger="click">
                <Avatar alt="" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWnq868i2GVnU2oHO-zNECtdE7R6aO1Dgc7MgpkSSLyObZsFO_vA" className={classes.avatar} />
            </Popover>
        );

        /*-----------------------------------Using for Modal Sign-----------------------*/
        const { getFieldDecorator } = this.props.form;

        function getStepContent(stepIndex) {
            switch (stepIndex) {
                case 0:
                    return (
                        <Form className="login-form">
                            <Form.Item>
                                {getFieldDecorator('userName', {
                                    rules: [{ required: true, message: 'Please input your username!' }],
                                })(
                                    <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
                                )}
                            </Form.Item>
                            <Form.Item>
                                {getFieldDecorator('password', {
                                    rules: [{ required: true, message: 'Please input your Password!' }],
                                })(
                                    <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
                                )}
                            </Form.Item>
                            <Form.Item>
                                <Input prefix={<Icon type="solution" style={{ color: 'rgba(0,0,0,.25)' }} />} type="text" placeholder="Link Avatar" />
                            </Form.Item>
                            <Form.Item>
                                {getFieldDecorator('email', {
                                    rules: [{ required: true, message: 'Please input your Email!' }],
                                })(
                                    <Input prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />} type="email" placeholder="Email" />
                                )}
                            </Form.Item>
                        </Form>
                    );
                case 1:
                    return (
                        <Form className="login-form">
                            <label>
                                We have sent you a confirmation code in your email.
                                Please enter a validation code
                            </label>
                            <Form.Item>
                                {getFieldDecorator('Code Confirm', {
                                    rules: [{ required: true, message: 'Please input your Code Confirm!' }],
                                })(
                                    <Input prefix={<Icon type="number" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Your Code" />
                                )}
                            </Form.Item>
                        </Form>
                    );
                case 2:
                    return 'This is the bit I really care about!';
                default:
                    return 'Uknown stepIndex';
            }
        }


        return (
            <div className={classes.root}>

                {/*-----------------Modal Login-------------------*/}

                <Modal
                    title="Basic Modal"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    <Form className="login-form">
                        <Form.Item>
                            {getFieldDecorator('userName', {
                                rules: [{ required: true, message: 'Please input your username!' }],
                            })(
                                <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
                            )}
                        </Form.Item>
                        <Form.Item>
                            {getFieldDecorator('password', {
                                rules: [{ required: true, message: 'Please input your Password!' }],
                            })(
                                <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
                            )}
                        </Form.Item>
                        <Form.Item>
                            {getFieldDecorator('remember', {
                                valuePropName: 'checked',
                                initialValue: true,
                            })(
                                <Checkbox>Remember me</Checkbox>
                            )}
                            <a className="login-form-forgot" href="">Forgot password</a>
                            <div>
                                <Button variant="raised" color="primary" className={classes.button} onClick={this.handleOk.bind(this)}>
                                    Log in
                                </Button>
                            </div>
                            <div>
                                Or <a href="">register now!</a>
                            </div>
                        </Form.Item>
                    </Form>
                </Modal>

                {/*------------------Modal Sign Up----------------------*/}

                <Modal
                    title="Basic Modal"
                    visible={this.state.visibleSignUp}
                    onOk={this.handleCancelSignUp}
                    onCancel={this.handleCancelSignUp}
                >
                    <Stepper activeStep={activeStep} alternativeLabel>
                        {steps.map(label => {
                            return (
                                <Step key={label}>
                                    <StepLabel>{label}</StepLabel>
                                </Step>
                            );
                        })}
                    </Stepper>
                    <div>
                        {this.state.activeStep === steps.length ? (
                            <div>
                                You registration account success...!
                            </div>
                        ) : (
                            <div>
                                {getStepContent(activeStep)}
                                <div>
                                    <Button
                                        disabled={activeStep === 0}
                                        onClick={this.handleBack}
                                        className={classes.backButton}
                                    >
                                        Back
                                    </Button>
                                    <Button variant="raised" color="primary" onClick={this.handleNext}>
                                        {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                                    </Button>
                                </div>
                            </div>
                        )}
                    </div>
                </Modal>

                {/*----------------Drawer-----------------------------------*/}

                <AppBar className={classes.appBar}>
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={this.handleDrawerToggle}
                            className={classes.navIconHide}
                        >
                            <MenuIcon />
                        </IconButton>

                        <Input.Group compact>
                            <Input.Search
                                placeholder="Search"
                                onSearch={ value => self.onSearchInput(value, self.state.forWhat)}
                                style={{ width: 'auto' }}
                            />
                            <Select defaultValue="Borrowers" onChange={ value => this.onSelectChange(value)}>
                                <Select.Option value="Borrowers">Borrowers</Select.Option>
                                <Select.Option value="Books">Books</Select.Option>
                            </Select>
                        </Input.Group>
                        {ButtonSignUp}
                        {ButtonLogin}
                        {User}
                    </Toolbar>
                </AppBar>
                <Hidden mdUp>
                    <Drawer
                        variant="temporary"
                        anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                        open={this.state.mobileOpen}
                        onClose={this.handleDrawerToggle}
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                        ModalProps={{
                            keepMounted: true, // Better open performance on mobile.
                        }}
                    >
                        {drawer}
                    </Drawer>
                </Hidden>
                <Hidden smDown implementation="css">
                    <Drawer
                        variant="permanent"
                        open
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                    >
                        {drawer}
                    </Drawer>
                </Hidden>
                <main className={classes.content}>
                    <div className={classes.toolbar} />
                    {<Router borrowers={this.props.borrowers} books={this.state.books}/>}
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
                </main>
            </div>
        );
    }
}

LayoutWeb.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(withRouter(Form.create()(connect(
    mapStateToProps,
    mapDispatchToProps
)(LayoutWeb))));