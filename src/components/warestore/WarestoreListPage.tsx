import { Button, Col, Empty, Row, message } from 'antd';
import { useEffect, useState } from "react";
import { IWareStoreItem } from "../../interfaces/warestore";
import { useAppSelector } from "../../hooks/redux";
import { apiClient } from "../../utils/api/apiClient.ts";
import { Link } from "react-router-dom";
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';

const WarestoreListPage = () => {
    const [warestores, setWarestores] = useState<IWareStoreItem[]>([]);
    const { isSupplier } = useAppSelector(state => state.authentication);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await apiClient.get<IWareStoreItem[]>('api/ware-store');
                setWarestores(response.data);
            } catch (error) {
                console.error('Error fetching warehouse:', error);
                message.error('Failed to fetch warehouse');
            }
        };
        fetchData();
    }, []);

    const handleDelete = async (id: number) => {
        try {
            await apiClient.delete(`api/ware-store/${id}`);
            setWarestores(prev => prev.filter(item => item.id !== id));
            message.success('Warehouse deleted successfully');
        } catch (error) {
            console.error('Error deleting warehouse:', error);
            message.error('Failed to delete warehouse');
        }
    };

    return (
        <div style={{
            padding: '20px',
            backgroundColor: '#f9f9f9',
            minHeight: '100vh',
            fontFamily: 'Arial, sans-serif'
        }}>
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '30px'
            }}>
                <h1 style={{
                    color: '#C39964',
                    fontSize: '28px',
                    fontWeight: 'bold',
                    margin: 0
                }}>
                    Warehouse List
                </h1>
                {isSupplier && (
                    <Link to="/warehouse/create">
                        <Button
                            type="primary"
                            icon={<PlusOutlined />}
                            style={{
                                borderColor: '#C39964',
                                color: '#fff',
                                backgroundColor: '#C39964',
                                transition: 'all 0.3s ease',
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.backgroundColor = '#B88C56';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.backgroundColor = '#C39964';
                            }}
                        >
                            Create Warehouse
                        </Button>
                    </Link>
                )}
            </div>

            {warestores.length === 0 ? (
                <Empty
                    description={<span style={{ color: '#555' }}>No warehouses available</span>}
                    styles={{
                        image: { height: '100px' }
                    }}
                />
            ) : (
                <Row gutter={[24, 24]} style={{ margin: '0 auto', maxWidth: '1200px' }}>
                    {warestores.map((warestore) => (
                        <Col key={warestore.id} xxl={6} lg={8} md={12} sm={24} xs={24}>
                            <div style={{
                                position: 'relative',
                                borderRadius: '16px',
                                overflow: 'hidden',
                                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                                backgroundColor: '#fff',
                                border: '1px solid #ddd',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                padding: '20px',
                                minHeight: '200px'
                            }}
                                 onMouseEnter={(e) => {
                                     e.currentTarget.style.transform = 'scale(1.03)';
                                     e.currentTarget.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.15)';
                                 }}
                                 onMouseLeave={(e) => {
                                     e.currentTarget.style.transform = 'scale(1)';
                                     e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
                                 }}
                            >
                                <Link to={`${warestore.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                    <div style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        gap: '10px'
                                    }}>
                                        <h2 style={{ color: '#C39964', fontSize: '20px', fontWeight: 'bold' }}>
                                            {warestore.name}
                                        </h2>
                                        <span style={{ color: '#555', fontSize: '14px' }}>
                                            ID: {warestore.id}
                                        </span>
                                    </div>
                                </Link>

                                {isSupplier && (
                                    <div style={{
                                        marginTop: '20px',
                                        display: 'flex',
                                        gap: '10px'
                                    }}>
                                        <Link to={`/warehouse/edit/${warestore.id}`}>
                                            <Button
                                                icon={<EditOutlined />}
                                                type="primary"
                                                style={{
                                                    borderColor: '#C39964',
                                                    color: '#fff',
                                                    backgroundColor: '#C39964',
                                                    transition: 'all 0.3s ease',
                                                }}
                                                onMouseEnter={(e) => {
                                                    e.currentTarget.style.backgroundColor = '#B88C56';
                                                }}
                                                onMouseLeave={(e) => {
                                                    e.currentTarget.style.backgroundColor = '#C39964';
                                                }}
                                            >
                                                Edit
                                            </Button>
                                        </Link>

                                        <Button
                                            onClick={() => handleDelete(warestore.id)}
                                            icon={<DeleteOutlined />}
                                            danger
                                            style={{
                                                borderColor: '#ff4d4f',
                                                color: '#fff',
                                                backgroundColor: '#ff4d4f',
                                                transition: 'all 0.3s ease',
                                            }}
                                            onMouseEnter={(e) => {
                                                e.currentTarget.style.backgroundColor = '#e53e3e';
                                            }}
                                            onMouseLeave={(e) => {
                                                e.currentTarget.style.backgroundColor = '#ff4d4f';
                                            }}
                                        >
                                            Delete
                                        </Button>
                                    </div>
                                )}
                            </div>
                        </Col>
                    ))}
                </Row>
            )}
        </div>
    );
};

export default WarestoreListPage;