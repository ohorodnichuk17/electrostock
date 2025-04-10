import {useEffect, useState} from "react";
import { useAppSelector } from "../../hooks/redux";
import {useNavigate, useParams} from "react-router-dom";
import { IWareStoreEdit} from "../../interfaces/warestore";
import { apiClient } from "../../utils/api/apiClient.ts";
import { Button, Form, Input, message } from "antd";

export default function WarestoreEditPage() {
    const { id } = useParams();
    const [loading, setLoading] = useState(false);
    const { isSupplier } = useAppSelector(state => state.authentication);
    const [form] = Form.useForm();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchWarestore = async () => {
            setLoading(true);
            try {
                const response = await apiClient.get(`api/ware-store/${id}`);
                form.setFieldsValue({ name: response.data?.name });
            } catch (error) {
                console.error('Error fetching warestore:', error);
                message.error('Failed to fetch warestore');
            } finally {
                setLoading(false);
            }
        };
        fetchWarestore();
    }, [id]);

    const onFinish = async (values: IWareStoreEdit) => {
        setLoading(true);
        const data = { ...values, id };
        try {
            await apiClient.put('api/ware-store/edit', data);
            navigate('/warestores');
            message.success('Warestore updated successfully');
        } catch (error) {
            console.error('Error updating warestore:', error);
            message.error('Failed to update warestore');
        } finally {
            setLoading(false);
        }
    }

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
                        You must be a <span style={{ color: '#C39964' }}>supplier</span> to edit a warestore!
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
                            Edit Warestore
                        </h1>
                        <Form
                            form={form}
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