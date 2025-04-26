import React from "react";
import { useNavigate } from "react-router-dom";
import { Form, Input, Button, message, List, Card } from "antd";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { RootState } from "../../store";
import {createOrder} from "../../store/order/order.action.ts";
import {clearCart} from "../../store/cart/cart.slice.ts";
import moment from "moment";

const OrderCreatePage: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const { user } = useAppSelector((state: RootState) => state.authentication);
    const { cartItems } = useAppSelector((state: RootState) => state.cart);

    const handleSubmit = async (values: { returnDate: string }) => {
        if (!user || !cartItems.length) {
            message.error("User or cart is empty.");
            return;
        }

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
            dispatch(clearCart());
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
            </Card>
        </div>
    );
};

export default OrderCreatePage;