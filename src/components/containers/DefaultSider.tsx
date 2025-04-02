import * as React from "react";
import { Layout, Menu } from 'antd';
import { PlusCircleOutlined, UnorderedListOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import {useAppSelector} from "../../hooks/redux";

const { Sider } = Layout;

const DefaultSider = () => {
    const { isLogin, isAdmin } = useAppSelector(state => state.authentication);

    const menuItems = [
        {
            key: '1',
            icon: <UnorderedListOutlined />,
            label: 'Categories List',
            link: '/',
        },
    ];

    if (isAdmin) {
        menuItems.push({
            key: '2',
            icon: <PlusCircleOutlined />,
            label: 'Create category',
            link: '/category/create',
        });
    }

    if (isLogin) {
        menuItems.push({
            key: '3',
            icon: <PlusCircleOutlined />,
            label: 'Create post',
            link: '/post/create',
        });
    }

    return (
        <Sider width={200} style={{ background: '#fff' }}>
            <Menu mode="inline" defaultSelectedKeys={['1']} defaultOpenKeys={['1']} style={{ height: '100%', borderRight: 0 }}>
                {menuItems.map(item => (
                    <Menu.Item key={item.key} icon={item.icon}>
                        <Link to={item.link}>{item.label}</Link>
                    </Menu.Item>
                ))}
            </Menu>
        </Sider>
    );
};

export default DefaultSider;
