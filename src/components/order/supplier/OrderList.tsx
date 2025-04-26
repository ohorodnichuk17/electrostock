import React, { useEffect } from "react";
import { List, Card, Button, message, Spin } from "antd";
import {useAppDispatch, useAppSelector} from "../../../hooks/redux";
import {RootState} from "../../../store";
import {deleteOrder, getAllOrders} from "../../../store/order/order.action.ts";

export default function OrderList() {
    const dispatch = useAppDispatch();
    const { orders, loading } = useAppSelector((state: RootState) => state.order);
    const { isSupplier } = useAppSelector((state: RootState) => state.authentication);


    useEffect(() => {
        if (isSupplier) {
            dispatch(getAllOrders());
        }
    }, [dispatch, isSupplier]);

    const handleDelete = async (orderId: string) => {
        try {
            await dispatch(deleteOrder(orderId)).unwrap();
            message.success("Order deleted successfully");
            dispatch(getAllOrders());
        } catch (error) {
            message.error("Failed to delete order");
        }
    };

    if (loading) {
        return (
            <div style={{ display: "flex", justifyContent: "center", marginTop: "50px" }}>
                <Spin size="large" />
            </div>
        );
    }

    if (!isSupplier) {
        return (
            <div style={{ textAlign: "center", marginTop: "50px" }}>
                <h2>Access Denied</h2>
                <p>You must be a supplier to view orders.</p>
            </div>
        );
    }

    return (
        <div style={{ padding: "20px" }}>
            <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Orders List</h2>
            <List
                grid={{ gutter: 16, column: 1 }}
                dataSource={orders}
                renderItem={(order) => (
                    <List.Item>
                        <Card
                            title={`Order ID: ${order.id}`}
                            extra={
                                <Button
                                    danger
                                    onClick={() => handleDelete(order.id)}
                                >
                                    Delete
                                </Button>
                            }
                            style={{
                                borderRadius: "12px",
                                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                            }}
                        >
                            <p><strong>User ID:</strong> {order.userId}</p>
                            <p><strong>Order Date:</strong> {new Date(order.orderDate).toLocaleDateString()}</p>
                            <p><strong>Return Date:</strong> {new Date(order.returnDate).toLocaleDateString()}</p>
                        </Card>
                    </List.Item>
                )}
            />
        </div>
    );
}