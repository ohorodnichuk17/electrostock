import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { List, Card, Button } from "antd";
import {IOrderItem} from "../../interfaces/order";

const OrderSuccessPage: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { orderedItems } = location.state as { orderedItems: IOrderItem[] };

    return (
        <div
            style={{
                padding: "20px",
                backgroundColor: "#f0f2f5",
                minHeight: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <Card
                title="Order Successful!"
                style={{
                    width: "600px",
                    borderRadius: "12px",
                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                    backgroundColor: "#fff",
                }}
            >
                <h3>Your Ordered Items:</h3>
                <List
                    dataSource={orderedItems}
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
                <Button
                    type="primary"
                    onClick={() => navigate("/")}
                    block
                    style={{
                        marginTop: "20px",
                        backgroundColor: "#C39964",
                        borderColor: "#C39964",
                        color: "#fff",
                    }}
                >
                    Back to Home
                </Button>
            </Card>
        </div>
    );
};

export default OrderSuccessPage;
