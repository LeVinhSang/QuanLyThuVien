import React from 'react';
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
import Router from "./Route";


export default class LayoutBorrower extends React.Component {

    render() {

        return (
            <Layout style={{ minHeight: '100vh' }}>
                <Layout.Sider>
                    <div className="logo">
                        {/*todo*/}
                    </div>
                    <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                        <Menu.Item key="1">
                            <Icon type="user" />
                            <span>Borrower</span>
                        </Menu.Item>
                        <Menu.Item key="2">
                            <Icon type="book" />
                            <span>Get Book</span>
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
                    <Layout.Header style={{ background: '#fff', padding: 0 }} />
                    <Layout.Content style={{ margin: '0 16px' }}>
                        <Breadcrumb style={{ margin: '16px 0' }}>
                            <Breadcrumb.Item>User</Breadcrumb.Item>
                            <Breadcrumb.Item>Bill</Breadcrumb.Item>
                        </Breadcrumb>
                        <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
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
