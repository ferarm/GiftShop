import React from 'react';
import { Layout, Menu, Breadcrumb, Button } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { Link, withRouter } from 'react-router-dom';
import * as actions from '../store/actions/auth';
import { connect } from 'react-redux';
import MenuItem from 'antd/lib/menu/MenuItem';
import data from "../data.json";
import Products from '../components/Products';

const { Header, Content, Footer } = Layout;

class CustomLayout extends React.Component {
    constructor(){
        super();
        this.state = {
            products: data.products,
            size: "",
            sort: "",

        };
    }
    render() {
    return (
        <div className="grid-container">
        <Layout className="layout">
            <Header>
            <div className="logo" />
            <Menu
                theme="dark"
                mode="horizontal"
                defaultSelectedKeys={['1']}
                style={{ lineHeight: '64px' }}
            >
                <MenuItem>
                <Link to="/">
                    GiftShop
                </Link>
                </MenuItem>
                {
                    this.props.isAuthenticated ? 
                    <Menu.Item key="3" onClick={this.props.logout}>                    
                        Logout                    
                    </Menu.Item>
                    :
                    <Menu.Item key="3">
                    <Link to="/login">
                        Login
                    </Link>
                    </Menu.Item>
                }
                <Menu.Item key="1">
                    <Link to="/">
                        Home
                    </Link>
                </Menu.Item>
                <Menu.Item key="2">
                    <Link to="/">
                        Categories
                    </Link>
                </Menu.Item>              
                
            </Menu>
            </Header> 
            <main>
                <div className="content">
                    <div className="main">
                        <Products products={this.state.products}></Products>
                        
                    </div>
                    <div className="sidebar">
                        Cart Items
                    </div>
                </div>
            <Content style={{ padding: '0 50px' }}>
            <p/>
            <input size="30" type="search" placeholder="Search" />&nbsp;
            <Button type="primary">
                Go
            </Button>{' '}
            <p/>
            <h2>Products List</h2>
            
                
                <div> </div>
                <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
                    {this.props.children}
                </div>
            </Content>
            </main>
            <Footer style={{ textAlign: 'center' }}>
            GiftShop © 2020 Created by Fernando Martínez
            </Footer>
            
        </Layout>
        </div>
    );
    }
}


const mapDispatchToProps = dispatch => {
    return {
        logout: () => dispatch(actions.logout())
    }
}

export default withRouter(connect(null, mapDispatchToProps)(CustomLayout));

