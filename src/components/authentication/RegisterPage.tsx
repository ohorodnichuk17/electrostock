import * as React from "react";
import { useState, useEffect } from "react";
import { Button, Form, Input, Typography, message, Spin } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import { unwrapResult } from '@reduxjs/toolkit';
import { useNotification } from '../../hooks/notification';
import { Status } from '../../utils/enums';
import { IRegister } from "../../interfaces/authentication";
import { register } from "../../store/authentication/authentication.action.ts";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import Electronics from "../../assets/electronics.png";

const RegisterPage: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [messageApi, contextHolder] = message.useMessage();
    const { handleError } = useNotification(messageApi);
    const status = useAppSelector(state => state.authentication.status);

    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const onFinish = async (values: IRegister) => {
        try {
            const response = await dispatch(register(values));
            unwrapResult(response);
            navigate('/');
        } catch (error) {
            handleError(error);
        }
    };

    return (
        <Spin tip="Loading" size="large" spinning={status === Status.LOADING}>
            {contextHolder}
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minHeight: '100vh',
                    backgroundColor: '#f5f5f5',
                    padding: '20px',
                }}
            >
                <div
                    style={{
                        display: 'flex',
                        width: '800px',
                        backgroundColor: '#fff',
                        borderRadius: '12px',
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                        overflow: 'hidden',
                        flexDirection: isMobile ? "column" : "row"
                    }}
                >
                    <div style={{ flex: 1, padding: '40px' }}>
                        <Typography.Title
                            level={3}
                            style={{
                                textAlign: 'center',
                                marginBottom: '30px',
                                color: '#C39964',
                                fontWeight: 'bold',
                            }}
                        >
                            Create an Account
                        </Typography.Title>

                        <Form
                            name="register"
                            initialValues={{ remember: true }}
                            onFinish={onFinish}
                        >
                            <Form.Item
                                name="firstName"
                                rules={[{ required: true, message: 'Please enter your first name!' }]}
                            >
                                <Input prefix={<UserOutlined style={{ color: '#C39964' }} />} placeholder="First Name" size="large" />
                            </Form.Item>

                            <Form.Item
                                name="lastName"
                                rules={[{ required: true, message: 'Please enter your last name!' }]}
                            >
                                <Input prefix={<UserOutlined style={{ color: '#C39964' }} />} placeholder="Last Name" size="large" />
                            </Form.Item>

                            <Form.Item
                                name="email"
                                rules={[
                                    { type: 'email', message: 'Please enter a valid email address!' },
                                    { required: true, message: 'Please enter your email!' },
                                ]}
                            >
                                <Input prefix={<UserOutlined style={{ color: '#C39964' }} />} placeholder="Email Address" size="large" />
                            </Form.Item>

                            <Form.Item
                                name="password"
                                rules={[{ required: true, message: 'Please enter your password!' }]}
                            >
                                <Input.Password prefix={<LockOutlined style={{ color: '#C39964' }} />} placeholder="Password" size="large" />
                            </Form.Item>

                            <Form.Item
                                name="confirmPassword"
                                dependencies={['password']}
                                rules={[
                                    { required: true, message: 'Please confirm your password!' },
                                    ({ getFieldValue }) => ({
                                        validator(_, value) {
                                            if (!value || getFieldValue('password') === value) {
                                                return Promise.resolve();
                                            }
                                            return Promise.reject(new Error('Passwords do not match!'));
                                        },
                                    }),
                                ]}
                            >
                                <Input.Password prefix={<LockOutlined style={{ color: '#C39964' }} />} placeholder="Confirm Password" size="large" />
                            </Form.Item>

                            <Form.Item>
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    block
                                    size="large"
                                    style={{ backgroundColor: '#C39964', borderColor: '#C39964', fontWeight: 'bold' }}
                                >
                                    Register
                                </Button>
                            </Form.Item>

                            <Typography.Text style={{ textAlign: 'center', display: 'block', marginTop: '10px', color: '#666' }}>
                                Already have an account?{' '}
                                <Link to="/login" style={{ color: '#C39964', fontWeight: 'bold' }}>
                                    Log in now!
                                </Link>
                            </Typography.Text>
                        </Form>
                    </div>

                    {!isMobile && (
                        <div
                            style={{
                                flex: 1,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                backgroundColor: '#C39964',
                            }}
                        >
                            <img
                                src={Electronics}
                                alt="Electronics"
                                style={{ width: '100%', maxHeight: '300px' }}
                            />
                        </div>
                    )}
                </div>
            </div>
        </Spin>
    );
};

export default RegisterPage;
