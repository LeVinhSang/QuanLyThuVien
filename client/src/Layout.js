import React from 'react';
import {Layout, Menu, Breadcrumb, Icon} from 'antd';
import {Link} from "react-router-dom";
import Router from "./Route";
import Timer from "./Timer";

export default class LayoutWeb extends React.Component {
    state = {
        collapsed: true,
        seconds: new Date()
    };

    componentWillUnmount() {
        clearInterval(this.interval);
    }


    onCollapse = (collapsed) => {
        this.setState({ collapsed });
    };

    render() {

        return (
            <Layout style={{ minHeight: '100vh' }}>
                <Layout.Sider
                    collapsible
                    collapsed={this.state.collapsed}
                    onCollapse={this.onCollapse}
                >
                >
                    <div className="logo">
                        {/*todo*/}
                    </div>
                    <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                        <Menu.Item key="1">
                            <Link to="/"><Icon type="user" /><span>Borrower</span></Link>
                        </Menu.Item>
                        <Menu.Item key="2">
                            <Link to="/books"><Icon type="book" /><span>Get Book</span></Link>
                        </Menu.Item>
                        <Menu.SubMenu
                            key="sub1"
                            title={<span><Icon type="user" /><span>User</span></span>}
                        >
                            <Menu.Item key="3">Tom</Menu.Item>
                            <Menu.Item key="4">Bill</Menu.Item>
                            <Menu.Item key="5">Alex</Menu.Item>
                        </Menu.SubMenu>
                        <Menu.SubMenu
                            key="sub2"
                            title={<span><Icon type="team" /><span>Team</span></span>}
                        >
                            <Menu.Item key="6">Team 1</Menu.Item>
                            <Menu.Item key="8">Team 2</Menu.Item>
                        </Menu.SubMenu>
                        <Menu.Item key="9">
                            <Icon type="file" />
                            <span>File</span>
                        </Menu.Item>
                    </Menu>
                </Layout.Sider>
                <Layout>
                    <Layout.Header style={{ background: '#fff', padding: 0 }}>
                    </Layout.Header>
                    <Layout.Content style={{ margin: '0 16px' }}>
                        <Breadcrumb style={{ margin: '16px 0' }}>
                            <Breadcrumb.Item>
                                <Timer/>
                            </Breadcrumb.Item>
                        </Breadcrumb>
                        <div style={{ padding: 24, background: '#fff', minHeight: 430 }}>
                            <Router/>
                        </div>
                    </Layout.Content>
                    <Layout.Footer style={{ textAlign: 'center' }}>
                        Ant Design ©2016 Created by Le Sang
                    </Layout.Footer>
                </Layout>
            </Layout>
        );
    }
}
