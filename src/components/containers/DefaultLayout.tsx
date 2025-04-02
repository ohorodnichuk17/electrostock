import { Layout } from 'antd';
import DefaultHeader from './DefaultHeader';
import { Outlet } from 'react-router-dom';

const { Content, Footer } = Layout;

const DefaultLayout = () => {
    return (
        <Layout style={{ minHeight: '100vh' }}>
            <DefaultHeader />

            <Content style={{ padding: '0 24px' }}>
                <Layout style={{ padding: '24px 0', minHeight: 'calc(100vh - 64px)' }}>
                    <Content style={{ padding: '0 24px', minHeight: '280px' }}>
                        <Outlet />
                    </Content>
                </Layout>
            </Content>

            <Footer
                style={{
                    textAlign: 'center',
                    backgroundColor: '#C39964',
                    color: '#fff',
                    padding: '24px 0',
                }}
            >
                <div
                    style={{
                        fontSize: '14px',
                        fontWeight: 'normal',
                        color: '#1F1F1F',
                        marginBottom: '8px',
                    }}
                >
                    Electro Stock ©2025
                </div>
                <div
                    style={{
                        fontSize: '12px',
                        fontWeight: 'lighter',
                        color: '#1F1F1F',
                    }}
                >
                    Developed with ❤️
                </div>
            </Footer>
        </Layout>
    );
};

export default DefaultLayout;