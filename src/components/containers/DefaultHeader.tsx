import { Button, Layout, Menu } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import { UserOutlined, PoweroffOutlined, UserAddOutlined } from '@ant-design/icons';
import {logout} from "../../store/authentication/authentication.slice.ts";
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {BackButton} from "../button/BackButton.tsx";
import * as React from "react";
import ButtonGroup from "antd/es/button/button-group";

const { Header } = Layout;

const DefaultHeader = () => {
    const dispatch = useAppDispatch();
    const location = useLocation();

    const { isLogin, user } = useAppSelector(state => state.authentication);

    const handleLogout = () => {
        dispatch(logout());
    };

    return (
        <Header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <BackButton />
                <div className="demo-logo" />
            </div>

            <Menu
                theme="dark"
                mode="horizontal"
                selectedKeys={[location.pathname.substr(1)]}
                style={{ flex: 1, minWidth: 0 }}
            >
                <Menu.Item key={'categories'}>
                    <Link to={`/`} style={{ textDecoration: 'none' }}>
                        Categories
                    </Link>
                </Menu.Item>
            </Menu>

            {isLogin ? (
                <ButtonGroup size="large">
                    <Button
                        type="primary"
                        style={{ display: 'flex', alignItems: 'center', marginRight: '8px' }}
                    >
                        <UserOutlined style={{ marginRight: '4px' }} />
                        {user?.name}
                    </Button>
                    <Button
                        type="primary"
                        icon={<PoweroffOutlined />}
                        onClick={() => handleLogout()}
                    >
                        Logout
                    </Button>
                </ButtonGroup>
            ) : (
                <div style={{ display: 'flex', gap: '8px' }}>
                    <Link to="/login" style={{ color: 'inherit', textDecoration: 'none' }}>
                        <Button icon={<UserOutlined />}>
                            Login
                        </Button>
                    </Link>
                    <Link to="/register" style={{ color: 'inherit', textDecoration: 'none' }}>
                        <Button type="primary" icon={<UserAddOutlined />}>
                            Register
                        </Button>
                    </Link>
                </div>
            )}
        </Header>
    );
};

export default DefaultHeader;
