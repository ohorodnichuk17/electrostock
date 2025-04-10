import { Button, Image, Layout, Menu } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import { UserOutlined, PoweroffOutlined, UserAddOutlined } from '@ant-design/icons';
import { logout } from "../../store/authentication/authentication.slice.ts";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { BackButton } from "../button/BackButton.tsx";
import * as React from "react";
import Logo from "../../assets/logo.png";

const { Header } = Layout;

const DefaultHeader = () => {
    const dispatch = useAppDispatch();
    const location = useLocation();

    const { isLogin, user } = useAppSelector(state => state.authentication);

    const handleLogout = () => {
        dispatch(logout());
    };

    const menuItems = [
        { key: 'home', label: 'Home', path: '/' },
        { key: 'warestore', label: 'Warestore', path: '/warestores' },
    ];

    return (
        <Header style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: '#C39964',
            padding: '0 24px',
        }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <div style={{ width: '40px', flexShrink: 0 }}>
                    <Image
                        src={Logo}
                        style={{
                            width: '100%',
                            height: 'auto',
                        }}
                    />
                </div>
                <div
                    className="demo-logo"
                    style={{
                        marginLeft: '16px',
                        color: '#fff',
                        fontSize: '18px',
                        fontWeight: 'bold',
                        whiteSpace: 'nowrap',
                    }}
                >
                    Electro Stock
                </div>
            </div>

            <Menu
                theme="dark"
                mode="horizontal"
                selectedKeys={[location.pathname.substr(1)]}
                style={{
                    flex: 1,
                    minWidth: 0,
                    backgroundColor: 'transparent',
                    borderColor: 'transparent',
                    color: '#fff',
                }}
                itemStyle={{
                    color: '#fff',
                    fontSize: '16px',
                    fontWeight: '500',
                }}
                activeStyle={{
                    backgroundColor: '#B88C56',
                    color: '#fff',
                }}
            >
                {menuItems.map((item) => (
                    <Menu.Item key={item.key}>
                        <Link
                            to={item.path}
                            style={{
                                color: 'inherit',
                                textDecoration: 'none',
                                transition: 'color 0.3s ease',
                            }}
                            onMouseEnter={(e) => (e.currentTarget.style.color = '#B88C56')}
                            onMouseLeave={(e) => (e.currentTarget.style.color = '#fff')}
                        >
                            {item.label}
                        </Link>
                    </Menu.Item>
                ))}
            </Menu>

            {isLogin ? (
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Button
                        type="text"
                        style={{
                            color: '#fff',
                            display: 'flex',
                            alignItems: 'center',
                            border: 'none',
                        }}
                    >
                        <UserOutlined style={{ marginRight: '4px', color: '#fff' }} />
                        {user?.name}
                    </Button>
                    <Button
                        type="primary"
                        icon={<PoweroffOutlined />}
                        onClick={handleLogout}
                        style={{
                            backgroundColor: '#B88C56',
                            borderColor: '#B88C56',
                            color: '#fff',
                        }}
                    >
                        Logout
                    </Button>
                </div>
            ) : (
                <div style={{ display: 'flex', gap: '8px' }}>
                    <Link to="/login" style={{ color: 'inherit', textDecoration: 'none' }}>
                        <Button
                            type="text"
                            style={{
                                backgroundColor: '#B88C56',
                                borderColor: '#B88C56',
                                color: '#fff',
                                transition: 'all 0.3s ease',
                            }}
                            icon={<UserOutlined />}
                            onMouseEnter={(e) => (e.currentTarget.style.filter = 'brightness(1.2)')}
                            onMouseLeave={(e) => (e.currentTarget.style.filter = 'brightness(1)')}
                        >
                            Login
                        </Button>
                    </Link>
                    <Link to="/register" style={{ color: 'inherit', textDecoration: 'none' }}>
                        <Button
                            type="primary"
                            icon={<UserAddOutlined />}
                            style={{
                                backgroundColor: '#B88C56',
                                borderColor: '#B88C56',
                                color: '#fff',
                                transition: 'all 0.3s ease',
                            }}
                            onMouseEnter={(e) => (e.currentTarget.style.filter = 'brightness(1.2)')}
                            onMouseLeave={(e) => (e.currentTarget.style.filter = 'brightness(1)')}
                        >
                            Register
                        </Button>
                    </Link>
                </div>
            )}
        </Header>
    );
};

export default DefaultHeader;