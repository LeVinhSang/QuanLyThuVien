import React, { Component }                  from 'react';
import { Link, Route }                       from 'react-router-dom';
import { Icon, Menu, Segment, Image, Popup } from 'semantic-ui-react';
import './App.css';
import jwt                                   from 'jsonwebtoken';
import default_avatar                        from './default_avatar.jpeg';

const RouteWithSubRoutes = route => (
    <Route
        exact
        path={route.path}
        render={props => (
            <route.component {...props} routes={route.routes}/>
        )}
    />
);

class App extends Component {

    state = {
        activeItem: '',
    };

    toggleMenu = () => {
        this.setState({
            menuActive: !this.state.menuActive
        });
    };

    handleActiveItem = (e, { name }) => {
        this.setState({
            activeItem: name
        });
    };

    isAuthentication = () => {
        return !!localStorage.getItem('token');
    };

    handleLogout = () => {
        localStorage.removeItem("token");
        this.setState({
            isOpenPopup: false,
            modalOpen  : false
        });

        window.location.href = '/';
    };

    editProfile = () => {
        window.location.href = '/edit-user/' + jwt.verify(localStorage.getItem('token'), 'sang').user_name;
    };

    render () {
        let { pages }                  = this.props;
        let { activeItem, menuActive } = this.state;
        let app                        = menuActive ? 'app menu-inactive' : 'app menu-active';

        const userEditor = (
            <Menu vertical>
                <Menu.Item onClick={this.editProfile.bind(this)}><Icon name='edit'/>Edit Profile</Menu.Item>
                <Menu.Item onClick={this.handleLogout.bind(this)}><Icon name='log out'/>Log Out</Menu.Item>
            </Menu>
        );

        const setting = (
            <Menu vertical>
                <Menu.Item><Icon name='mail'/>Send Mail</Menu.Item>
            </Menu>
        );

        return (
            <div className={app}>
                <Menu fixed='top'>
                    <Menu.Item header onClick={this.toggleMenu} style={styles.w240}>
                        Digital Library
                    </Menu.Item>
                    {this.isAuthentication() ?
                        <Menu.Menu position='right'>
                            <Menu.Item>
                                <Icon name='alarm'/>
                            </Menu.Item>
                            <Menu.Item>
                                <Popup
                                    trigger={<Image avatar
                                                    src={jwt.verify(localStorage.getItem('token'), 'sang').avatar
                                                    ? jwt.verify(localStorage.getItem('token'), 'sang').avatar : default_avatar}/>}
                                    content={userEditor}
                                    on='click'
                                    position='bottom center'
                                />
                            </Menu.Item>
                            <Menu.Item>
                                <Popup
                                    trigger={<Icon name='setting'/>}
                                    content={setting}
                                    on='click'
                                    position='bottom center'
                                />
                            </Menu.Item>
                        </Menu.Menu>
                        :
                        <Menu.Menu position='right'>
                            <Link to='/login'>
                                <Menu.Item>
                                    <Icon name='alarm'/>
                                </Menu.Item>
                            </Link>
                            <Link to='/login'>
                                <Menu.Item>
                                    Login
                                </Menu.Item>
                            </Link>
                            <Link to='/sign-up'>
                                <Menu.Item>
                                    Sign Up
                                </Menu.Item>
                            </Link>
                            <Menu.Item>
                                <Icon name='setting'/>
                            </Menu.Item>
                        </Menu.Menu>
                    }
                </Menu>
                <Menu id='sideBar' fixed='left' animation='push' vertical inverted className='side-bar'>
                    {pages.map((page, i) => ( page.route.linkLabel ) &&
                        <Menu.Item as={Link} key={i} to={page.route.path} name={page.route.linkLabel}
                                   active={activeItem === page.route.linkLabel}
                                   onClick={this.handleActiveItem}
                        >
                            {page.route.icon}
                            {page.route.linkLabel}
                        </Menu.Item>)}
                </Menu>
                <div id='content'>
                    <Segment className={'wrapper-content'} style={styles.borderNone}>
                        {pages.map((page, i) =>
                            <div key={i} className={page.route.className}>
                                <RouteWithSubRoutes key={i} {...page.route}/>
                            </div>
                        )}
                    </Segment>
                </div>
            </div>
        );
    }

}

const styles = {
    borderNone: {
        border      : 0,
        borderRadius: 0,
    },
    w240      : {
        width: 240
    }
};

export default App;
