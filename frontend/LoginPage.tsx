import * as React from "react";
import { useState } from "react";
import { Button, Form, Input, Typography } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import { unwrapResult } from '@reduxjs/toolkit';
import { login } from "../../store/authentication/authentication.action.ts";
import { ILogin } from "../../interfaces/authentication";
import { useAppDispatch } from "../../hooks/redux";

const LoginPage: React.FC = () => {
   const navigate = useNavigate();
   const dispatch = useAppDispatch();

   const [isLoading, setIsLoading] = useState(false);

   const onFinish = async (values: ILogin) => {
      try {
         setIsLoading(true);
         const response = await dispatch(login(values));
         unwrapResult(response);
         navigate('/');
      } catch (error) {
         console.log('Error ' + error);
      } finally {
         setIsLoading(false);
      }
   };

   return (
      <>
         <div
            style={{
               display: 'flex',
               justifyContent: 'center',
               alignItems: 'center',
               minHeight: '100vh',
               backgroundColor: '#f5f5f5',
            }}
         >
            <Form
               name="login"
               initialValues={{ remember: true }}
               onFinish={onFinish}
               style={{
                  width: 400,
                  padding: '40px',
                  borderRadius: '12px',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                  backgroundColor: '#fff',
               }}
            >
               <Typography.Title
                  level={3}
                  style={{
                     textAlign: 'center',
                     marginBottom: '30px',
                     color: '#C39964',
                     fontWeight: 'bold',
                  }}
               >
                  Log In
               </Typography.Title>

               <Form.Item
                  name="email"
                  rules={[
                     {
                        type: 'email',
                        message: 'Please enter a valid email address!',
                     },
                     {
                        required: true,
                        message: 'Please enter your email!',
                     },
                  ]}
               >
                  <Input
                     prefix={<UserOutlined style={{ color: '#C39964' }} />}
                     placeholder="Email Address"
                     size="large"
                  />
               </Form.Item>

               <Form.Item
                  name="password"
                  rules={[
                     {
                        required: true,
                        message: 'Please enter your password!',
                     },
                  ]}
               >
                  <Input.Password
                     prefix={<LockOutlined style={{ color: '#C39964' }} />}
                     placeholder="Password"
                     size="large"
                  />
               </Form.Item>

               <Form.Item>
                  <Button
                     type="primary"
                     htmlType="submit"
                     block
                     size="large"
                     style={{
                        backgroundColor: '#C39964',
                        borderColor: '#C39964',
                        fontWeight: 'bold',
                     }}
                     loading={isLoading}
                  >
                     Log In
                  </Button>
               </Form.Item>

               <Typography.Text
                  style={{
                     textAlign: 'center',
                     display: 'block',
                     marginTop: '10px',
                     color: '#666',
                  }}
               >
                  Don't have an account?{' '}
                  <Link to="/register" style={{ color: '#C39964', fontWeight: 'bold' }}>
                     Create one now!
                  </Link>
               </Typography.Text>
            </Form>
         </div>
      </>
   );
};

export default LoginPage;