import { Layout } from 'antd';
import DefaultHeader from './DefaultHeader';
import DefaultSider from './DefaultSider';
import { Outlet } from 'react-router-dom';

const { Content, Footer } = Layout;

const DefaultLayout = () => {
    return (
        <Layout style={{ minHeight: '100vh' }}>
            <DefaultHeader />

            <Content style={{ padding: '0 24px' }}>
                <Layout style={{ padding: '24px 0', minHeight: 'calc(100vh - 64px)' }}>
                    <DefaultSider />
                    <Content style={{ padding: '0 24px', minHeight: '280px' }}>
                        <Outlet />
                    </Content>
                </Layout>
            </Content>

            <Footer style={{ textAlign: 'center' }}>Ant Design ©2025 Created by Ant UED</Footer>
        </Layout>
    );
};

export default DefaultLayout;
