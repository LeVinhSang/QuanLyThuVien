import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Hidden from '@material-ui/core/Hidden';
import Divider from '@material-ui/core/Divider';
import MenuIcon from '@material-ui/icons/Menu';
import Router from "../Route/Route";
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import BookIcon from '@material-ui/icons/Book';
import HomeIcon from '@material-ui/icons/Home';
import {Link} from 'react-router-dom';
import logo from '../logo.svg';
import '../App.css';
import Timer from "../Timer";
import { Input } from 'antd';
import Button from '@material-ui/core/Button';

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
            width: `calc(100% - ${drawerWidth}px)`,
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
        width: `calc(100%)`,
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
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

class LayoutWeb extends React.Component {
    state = {
        mobileOpen: false,
        keyword:'',
        stateSearch: false
    };

    handleDrawerToggle = () => {
        this.setState({ mobileOpen: !this.state.mobileOpen });
    };

    menuClick = () => {
        this.setState({mobileOpen: false})
    };

    render() {
        const { classes, theme } = this.props;
        const self = this;
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
                                <ListItemText classes={{ primary: classes.primary }} inset primary="Book" />
                            </MenuItem>
                        </Link>
                        <MenuItem className={classes.menuItem} onClick={this.menuClick.bind(this)}>
                            <ListItemIcon className={classes.icon}>
                                <InboxIcon />
                            </ListItemIcon>
                            <ListItemText classes={{ primary: classes.primary }} inset primary="Inbox" />
                        </MenuItem>
                    </MenuList>
                </List>
            </div>
        );

        return (
            <div className={classes.root}>
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
                        <Typography className={classes.flex} variant="title" color="inherit" noWrap>
                            Viet-Hung Industrial University
                        </Typography>

                        <Input.Search
                            placeholder="Search"
                            onSearch={ value => {
                                if(value === '') {
                                    self.setState({stateSearch: false})
                                }
                                else {
                                    self.setState({keyword: value, stateSearch: true})
                                }
                            }}
                            style={{ width: 200 }}
                        />
                        <Button color="inherit" className={classes.button}>
                            Sign Up
                        </Button>
                        <Button color="inherit" className={classes.button}>
                            Log In
                        </Button>
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
                    {<Router keyword={this.state.keyword} stateSearch={this.state.stateSearch}/>}
                </main>
            </div>
        );
    }
}

LayoutWeb.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(LayoutWeb);