import { Button, Col, Row, message, Tag, Card } from 'antd';
import { useEffect, useState } from 'react';
import { IComponentItem } from '../../interfaces/component';
import { apiClient } from '../../utils/api/apiClient.ts';
import { Link } from 'react-router-dom';

export default function ComponentCard() {
    const [components, setComponents] = useState<IComponentItem[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await apiClient.get<IComponentItem[]>('api/component');
                setComponents(response.data);
            } catch (error) {
                console.error('Error fetching components:', error);
                message.error('Failed to fetch components');
            }
        };
        fetchData();
    }, []);

    const getCategoryColor = (category: string) => {
        switch (category) {
            case 'resistor':
                return 'blue';
            case 'transistor':
                return 'green';
            case 'microchip':
                return 'orange';
            case 'controller':
                return 'purple';
            default:
                return 'default';
        }
    };

    const getStockStatusColor = (status: string) => {
        switch (status.toLowerCase()) {
            case 'in stock':
                return 'green';
            case 'on order':
                return 'orange';
            case 'in reserve':
                return 'red';
            default:
                return 'default';
        }
    };

    return (
        <div style={{ padding: '20px', backgroundColor: '#f9f9f9' }}>
            <h1 style={{ color: '#C39964', fontSize: '28px', fontWeight: 'bold', marginBottom: '20px' }}>
                Components List
            </h1>
            {components.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '50px' }}>
                    <span>No components available</span>
                </div>
            ) : (
                <Row gutter={[24, 24]}>
                    {components.map((component) => (
                        <Col key={component.id} xxl={6} lg={8} md={12} sm={24} xs={24}>
                            <Card
                                hoverable
                                style={{
                                    borderRadius: '16px',
                                    height: '100%',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'space-between',
                                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                                    minHeight: '400px',
                                }}
                                cover={
                                    <img
                                        alt={component.name}
                                        src={component.imageUrl}
                                        style={{
                                            width: '100%',
                                            height: '200px',
                                            objectFit: 'cover',
                                            borderTopLeftRadius: '16px',
                                            borderTopRightRadius: '16px',
                                        }}
                                    />
                                }
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = 'scale(1.03)';
                                    e.currentTarget.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.15)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = 'scale(1)';
                                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
                                }}
                            >
                                <Link to={`/component/${component.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                    <div style={{ textAlign: 'center', padding: '10px 0' }}>
                                        <h2 style={{
                                            color: '#C39964',
                                            fontSize: '20px',
                                            fontWeight: 'bold',
                                            marginBottom: '10px',
                                            overflow: 'hidden',
                                            whiteSpace: 'nowrap',
                                            textOverflow: 'ellipsis',
                                        }}>
                                            {component.name}
                                        </h2>
                                        <Tag color={getCategoryColor(component.category)} style={{ marginBottom: '8px' }}>
                                            {component.category}
                                        </Tag>
                                        <div style={{ fontSize: '14px', color: '#555' }}>
                                            Quantity: {component.quantity}
                                        </div>
                                        <div style={{ marginTop: '8px' }}>
                                            <Tag color={getStockStatusColor(component.stockStatus)}>
                                                {component.stockStatus}
                                            </Tag>
                                        </div>
                                    </div>
                                </Link>
                            </Card>
                        </Col>
                    ))}
                </Row>
            )}
        </div>
    );
}
