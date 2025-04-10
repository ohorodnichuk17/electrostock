import { useState } from "react";
import { useAppSelector } from "../../hooks/redux";
import { useNavigate } from "react-router-dom";
import { IWareStoreCreate } from "../../interfaces/warestore";
import { apiClient } from "../../utils/api/apiClient.ts";
import { Button, Form, Input, message } from "antd";

export default function WarestoreCreatePage() {
    const [loading, setLoading] = useState(false);
    const { isSupplier } = useAppSelector(state => state.authentication);
    const navigate = useNavigate();

    const onFinish = async (data: IWareStoreCreate) => {
        setLoading(true);
        try {
            await apiClient.post('api/ware-store/create', data);
            message.success('Warestore created successfully');
            navigate('/');
        } catch (error) {
            console.log('Warestore creation error: ', error);
            message.error('Warestore creation failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{
            padding: '40px 20px',
            backgroundColor: '#f9f9f9',
            minHeight: '100vh',
            fontFamily: 'Arial, sans-serif'
        }}>
            <div style={{
                maxWidth: '600px',
                margin: '0 auto',
                backgroundColor: '#ffffff',
                borderRadius: '12px',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                padding: '30px',
                border: '1px solid #ddd'
            }}>
                {!isSupplier ? (
                    <div style={{
                        textAlign: 'center',
                        color: '#555',
                        fontSize: '18px',
                        fontWeight: 'bold'
                    }}>
                        You must be a <span style={{ color: '#C39964' }}>supplier</span> to create a warestore!
                    </div>
                ) : (
                    <>
                        <h1 style={{
                            color: '#C39964',
                            fontSize: '28px',
                            fontWeight: 'bold',
                            marginBottom: '20px',
                            textAlign: 'center'
                        }}>
                            Create Warestore
                        </h1>
                        <Form
                            layout="vertical"
                            onFinish={onFinish}
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '20px'
                            }}
                        >
                            <Form.Item
                                label={<span style={{ color: '#333', fontWeight: 'bold' }}>Name</span>}
                                name="name"
                                rules={[{ required: true, message: 'Please enter warestore name!' }]}
                            >
                                <Input
                                    placeholder="Enter warestore name"
                                    style={{
                                        height: '45px',
                                        borderRadius: '8px',
                                        border: '1px solid #ddd',
                                        fontSize: '16px'
                                    }}
                                />
                            </Form.Item>

                            <Form.Item>
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    loading={loading}
                                    style={{
                                        backgroundColor: '#C39964',
                                        borderColor: '#C39964',
                                        height: '45px',
                                        fontSize: '16px',
                                        fontWeight: 'bold',
                                        borderRadius: '8px',
                                        transition: 'background-color 0.3s ease'
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.backgroundColor = '#b38954';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.backgroundColor = '#C39964';
                                    }}
                                >
                                    Submit
                                </Button>
                            </Form.Item>
                        </Form>
                    </>
                )}
            </div>
        </div>
    );
}