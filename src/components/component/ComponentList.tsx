import { Col, Row, Card, Tag, Button, message } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { IComponentItem } from '../../interfaces/component';
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { apiClient } from "../../utils/api/apiClient.ts";
import {useEffect, useState} from "react";
import { addToCart } from "../../store/cart/cart.slice.ts";
import {getAllOrders} from "../../store/order/order.action.ts";

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
    const dispatch = useAppDispatch();
    const { orders } = useAppSelector((state) => state.order);

    const handleAddToCart = (component: IComponentItem) => {
        dispatch(addToCart(component));
    };

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
    };

    useEffect(() => {
        dispatch(getAllOrders());
    }, [dispatch]);

    const isComponentReserved = (componentId: number) => {
        const reservedOrder = orders.find(order => order.componentId === componentId);
        if (reservedOrder) {
            return reservedOrder.returnDate;
        }
        return null;
    };

    return (
        <Row gutter={[16, 16]} style={{ padding: '20px', backgroundColor: '#f9f9f9' }}>
            {components.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '50px', width: '100%' }}>
                    <span>No components available</span>
                </div>
            ) : (
                components.map(component => {
                    const returnDate = isComponentReserved(component.id);

                    return (
                        <Col key={component.id} xxl={6} lg={8} md={12} sm={24} xs={24}>
                            {returnDate && (
                                <div style={{
                                    position: 'absolute',
                                    top: '8px',
                                    left: '8px',
                                    backgroundColor: 'rgba(255, 77, 79, 0.9)',
                                    color: '#fff',
                                    padding: '4px 8px',
                                    borderRadius: '4px',
                                    fontSize: '12px',
                                    fontWeight: 'bold',
                                    zIndex: 1,
                                }}>
                                    Reserved until: {new Date(returnDate).toLocaleDateString()}
                                </div>
                            )}
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
                                    filter: returnDate ? 'blur(2px)' : 'none',
                                    opacity: returnDate ? 0.7 : 1,
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
                                            filter: returnDate ? 'blur(2px)' : 'none',
                                        }}
                                    />
                                }
                                onMouseEnter={(e) => {
                                    if (!returnDate) {
                                        e.currentTarget.style.transform = 'scale(1.02)';
                                        e.currentTarget.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.15)';
                                    }
                                }}
                                onMouseLeave={(e) => {
                                    if (!returnDate) {
                                        e.currentTarget.style.transform = 'scale(1)';
                                        e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
                                    }
                                }}
                            >
                                <div style={{padding: '12px', textAlign: 'center'}}>

                                    <Link to={`/component/${component.id}`}
                                          style={{textDecoration: 'none', color: 'inherit'}}>
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
                                        <Tag color={getCategoryColor(component.category)} style={{marginBottom: '6px'}}>
                                            {component.category}
                                        </Tag>
                                        <div style={{fontSize: '12px', color: '#555', marginBottom: '6px'}}>
                                            Quantity: {component.quantity}
                                        </div>
                                        <Tag color={getStockStatusColor(component.stockStatus)}
                                             style={{fontSize: '12px'}}>
                                            {component.stockStatus}
                                        </Tag>
                                        {isSupplier && (
                                            <div style={{marginTop: '12px'}}>
                                                <Link to={`/component/edit/${component.id}`}>
                                                    <Button
                                                        icon={<EditOutlined/>}
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
                                                    icon={<DeleteOutlined/>}
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
                                    </Link>
                                    <div style={{marginTop: '10px'}}>
                                        <Button
                                            type="primary"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleAddToCart(component);
                                            }}
                                            disabled={!!returnDate}
                                        >
                                            Add to Cart
                                        </Button>
                                    </div>
                                </div>
                            </Card>
                        </Col>
                    );
                })
            )}
        </Row>
    );
}