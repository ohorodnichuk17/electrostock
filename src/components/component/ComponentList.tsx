import {Col, Row, Card, Tag, Button, message} from 'antd';
import {Link, useNavigate} from 'react-router-dom';
import { IComponentItem } from '../../interfaces/component';
import {useAppSelector} from "../../hooks/redux";
import {DeleteOutlined, EditOutlined} from "@ant-design/icons";
import {apiClient} from "../../utils/api/apiClient.ts";
import {useState} from "react";

interface Props {
    components: IComponentItem[];
}

const getCategoryColor = (category: string) => {
    switch (category) {
        case 'resistor': return '#007bff';
        case 'transistor': return '#28a745';
        case 'microchip': return '#fd7e14';
        case 'controller': return '#6f42c1';
        default: return '#adb5bd';
    }
};

const getStockStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
        case 'in stock': return '#28a745';
        case 'on order': return '#fd7e14';
        case 'in reserve': return '#dc3545';
        default: return '#adb5bd';
    }
};

export default function ComponentList({ components }: Props) {
    const { isSupplier } = useAppSelector(state => state.authentication);
    const [componentList, setComponentList] = useState<IComponentItem[]>([]);
    const navigate = useNavigate();

    const handleDelete = async (id: number) => {
        try {
            await apiClient.delete(`api/component/${id}`);
            setComponentList(prev => prev.filter(item => item.id !== id));
            message.success('Component deleted successfully');
            navigate('/components');
        } catch (error) {
            console.error('Error deleting component:', error);
            message.error('Failed to delete component');
        }
    }

    return (
        <Row gutter={[16, 16]} style={{ padding: '20px', backgroundColor: '#f9f9f9' }}>
            {components.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '50px', width: '100%' }}>
                    <span>No components available</span>
                </div>
            ) : (
                components.map(component => (
                    <Col key={component.id} xxl={6} lg={8} md={12} sm={24} xs={24}>
                        <Card
                            hoverable
                            style={{
                                borderRadius: '12px',
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                                overflow: 'hidden',
                            }}
                            cover={
                                <img
                                    alt={component.name}
                                    src={component.imageUrl}
                                    style={{
                                        width: '100%',
                                        height: '120px',
                                        objectFit: 'cover',
                                        borderTopLeftRadius: '12px',
                                        borderTopRightRadius: '12px',
                                    }}
                                />
                            }
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'scale(1.02)';
                                e.currentTarget.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.15)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'scale(1)';
                                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
                            }}
                        >
                            <Link to={`/component/${component.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                <div style={{ padding: '12px', textAlign: 'center' }}>
                                    <h2 style={{
                                        color: '#C39964',
                                        fontSize: '16px',
                                        fontWeight: 'bold',
                                        marginBottom: '8px',
                                        overflow: 'hidden',
                                        whiteSpace: 'nowrap',
                                        textOverflow: 'ellipsis',
                                    }}>
                                        {component.name}
                                    </h2>
                                    <Tag color={getCategoryColor(component.category)} style={{ marginBottom: '6px' }}>
                                        {component.category}
                                    </Tag>
                                    <div style={{ fontSize: '12px', color: '#555', marginBottom: '6px' }}>
                                        Quantity: {component.quantity}
                                    </div>
                                    <Tag color={getStockStatusColor(component.stockStatus)} style={{ fontSize: '12px' }}>
                                        {component.stockStatus}
                                    </Tag>
                                    {isSupplier && (
                                        <div style={{ marginTop: '12px' }}>
                                            <Link to={`/component/edit/${component.id}`}>
                                                <Button
                                                    icon={<EditOutlined />}
                                                    type="primary"
                                                    style={{
                                                        borderColor: '#C39964',
                                                        color: '#fff',
                                                        backgroundColor: '#C39964',
                                                        transition: 'all 0.3s ease',
                                                        marginRight: '15px',
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
                                                onClick={() => handleDelete(component.id)}
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
                            </Link>
                        </Card>
                    </Col>
                ))
            )}
        </Row>
    );
}