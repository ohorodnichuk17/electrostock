import React, {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import { Form, Input, Button, Modal, message, List, Card } from "antd";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { RootState } from "../../store";
import {createOrder, getAllOrders} from "../../store/order/order.action.ts";
import moment from "moment";

const CreateOrderPage: React.FC = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const { user } = useAppSelector((state: RootState) => state.authentication);
    const { cartItems } = useAppSelector((state: RootState) => state.cart);
    const { orders } = useAppSelector((state: RootState) => state.order);

    const hasExistingOrder = orders.length > 0;

    const handleSubmit = async (values: { returnDate: string }) => {
        if (hasExistingOrder) {
            message.error("You already have an active order.");
            return;
        }

        if (!user || !cartItems.length) {
            message.error("User or cart is empty.");
            return;
        }

        console.log("User object:", user);
        console.log("Cart Items:", cartItems);

        const orderData = {
            orderDate: moment().format("YYYY-MM-DDTHH:mm:ss"),
            returnDate: `${values.returnDate}T00:00:00`,
            componentId: cartItems.length === 1 ? cartItems[0].id : null,
            userId: Number(user.id),
        };
        console.log("Order data:", orderData);

        const token = localStorage.getItem("authToken");
        console.log("Auth Token:", token);
        if (!token) {
            console.log("Error: Token not found");
            return message.error("Token not found");
        }

        try {
            console.log("Sending request with order data:", orderData);
            await dispatch(createOrder(orderData));
            setIsModalVisible(true);
            message.success("Order created successfully!");
            navigate("/");
        } catch (error) {
            console.log("Error creating order:", error);
            message.error("Error creating the order.");
        }
    };


    return (
        <div
            style={{
                padding: "20px",
                backgroundColor: "#f9f9f9",
                minHeight: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <Card
                title="Create Order"
                style={{
                    width: "600px",
                    borderRadius: "12px",
                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                    backgroundColor: "#fff",
                }}
            >
                {hasExistingOrder ? (
                    <div style={{ textAlign: "center", color: "#ff4d4f" }}>
                        You already have an active order.
                    </div>
                ) : (
                    <>
                        <h3>Selected Items:</h3>
                        <List
                            dataSource={cartItems}
                            renderItem={(item) => (
                                <List.Item>
                                    <Card
                                        hoverable
                                        style={{
                                            width: "100%",
                                            borderRadius: "8px",
                                            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                                        }}
                                    >
                                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                                            <span>{item.name}</span>
                                            <span>Quantity: {item.quantity}</span>
                                        </div>
                                    </Card>
                                </List.Item>
                            )}
                        />

                        <Form onFinish={handleSubmit} layout="vertical" style={{ marginTop: "20px" }}>
                            <Form.Item
                                label="Return Date"
                                name="returnDate"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please enter the return date!",
                                    },
                                ]}
                            >
                                <Input type="date" />
                            </Form.Item>

                            <Form.Item>
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    block
                                    style={{
                                        backgroundColor: "#C39964",
                                        borderColor: "#C39964",
                                        color: "#fff",
                                    }}
                                >
                                    Create Order
                                </Button>
                            </Form.Item>
                        </Form>
                    </>
                )}
            </Card>

            <Modal
                title="Order Created Successfully"
                visible={isModalVisible}
                onCancel={() => setIsModalVisible(false)}
                footer={[
                    <Button
                        key="close"
                        type="primary"
                        onClick={() => setIsModalVisible(false)}
                        style={{
                            backgroundColor: "#C39964",
                            borderColor: "#C39964",
                            color: "#fff",
                        }}
                    >
                        Close
                    </Button>,
                ]}
            >
                <p>Your order has been created successfully!</p>
            </Modal>
        </div>
    );
};

export default CreateOrderPage;