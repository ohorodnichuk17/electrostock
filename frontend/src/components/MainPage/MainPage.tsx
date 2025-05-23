import * as React from "react";
import {Layout, Row, Col, Card, Typography, Button, message} from "antd";
import { ArrowRightOutlined } from "@ant-design/icons";
import { motion } from "framer-motion";
import transistor from "../../assets/transistor.png";
import resistor from "../../assets/resistor.png";
import controller from "../../assets/controller.png";
import microchip from "../../assets/microchip.png";
import {IWareStoreItem} from "../../interfaces/warestore";
import {useEffect} from "react";
import {apiClient} from "../../utils/api/apiClient.ts";
import {useNavigate} from "react-router-dom";

const { Title, Text } = Typography;

export default function MainPage() {
    const [wareStores, setWareStores] = React.useState<IWareStoreItem[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await apiClient.get<IWareStoreItem[]>('api/ware-store');
                setWareStores(response.data);
            } catch (error) {
                console.error('Error fetching warehouse:', error);
                message.error('Failed to fetch warehouse');
            }
        };
        fetchData();
    }, [])

    const icons = [
        { id: 1, icon: transistor},
        { id: 2, icon: resistor },
        { id: 3, icon: microchip },
        { id: 4, icon: controller },
    ];

    return (
        <Layout style={{ backgroundColor: "#fff" }}>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
                style={{
                    backgroundImage: "url('electronics-background.jpg')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    height: "500px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#fff",
                    textAlign: "center",
                    borderRadius: "10px",
                }}
            >
                <div style={{ padding: "16px" }}>
                    <Title
                        level={1}
                        style={{
                            fontSize: "56px",
                            fontWeight: "bold",
                            marginBottom: "16px",
                            textAlign: "center",
                            textShadow: "2px 2px 6px rgba(0, 0, 0, 0.3)",
                        }}
                    >
                        Welcome to Electro Stock
                    </Title>
                    <Text
                        style={{
                            fontSize: "22px",
                            lineHeight: "36px",
                            marginBottom: "24px",
                            textAlign: "center",
                            marginTop: "16px",
                            maxWidth: "600px",
                            margin: "0 auto",
                        }}
                    >
                        Your one-stop destination for high-quality electronic components.
                    </Text>
                    <Button
                        type="primary"
                        size="large"
                        style={{
                            backgroundColor: "#C39964",
                            borderColor: "#C39964",
                            color: "#fff",
                            fontWeight: "bold",
                            display: "block",
                            width: "100%",
                            maxWidth: "300px",
                            margin: "0 auto",
                            marginTop: "24px",
                            borderRadius: "50px",
                            boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
                        }}
                        icon={<ArrowRightOutlined />}
                    >
                        Explore Now
                    </Button>
                </div>
            </motion.div>

            <Row
                justify="center"
                style={{
                    padding: "64px 24px",
                    backgroundColor: "#f5f5f5",
                }}
            >
                <Col span={24}>
                    <Title level={2} style={{ textAlign: "center", marginBottom: "48px", fontWeight: "600" }}>
                        Our Warehouses
                    </Title>
                </Col>
                {wareStores.map((wareStore, index) => (
                    <Col key={wareStore.id} xs={24} sm={12} md={6} style={{ padding: "16px" }}>
                        <Card
                            hoverable
                            cover={
                                <img
                                    alt={wareStore.name}
                                    src={icons[index]?.icon}
                                    style={{ height: "150px", objectFit: "contain", borderRadius: "8px" }}
                                />
                            }
                            style={{
                                textAlign: "center",
                                border: "1px solid #C39964",
                                borderRadius: "12px",
                                boxShadow: "0px 4px 16px rgba(0, 0, 0, 0.1)",
                                transition: "transform 0.3s ease-in-out",
                            }}
                            onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.05)"}
                            onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
                            onClick={() => navigate("/warehouse/" + wareStore.name)}
                        >
                            <Title level={4} style={{ fontSize: "20px", fontWeight: "bold", margin: "16px 0" }}>
                                {wareStore.name}
                            </Title>
                            <Button
                                type="link"
                                style={{
                                    color: "#C39964",
                                    fontWeight: "bold",
                                }}
                            >
                                View More <ArrowRightOutlined />
                            </Button>
                        </Card>
                    </Col>
                ))}
            </Row>

            <Row
                justify="center"
                style={{
                    padding: "64px 24px",
                    backgroundColor: "#C39964",
                    color: "#fff",
                    textAlign: "center",
                }}
            >
                <Col span={24}>
                    <Title level={2} style={{ fontSize: "36px", fontWeight: "bold", marginBottom: "24px" }}>
                        Ready to Start Your Project?
                    </Title>
                    <Text style={{ fontSize: "18px", lineHeight: "32px", marginBottom: "32px", maxWidth: "600px", margin: "0 auto" }}>
                        Find the perfect components for your next innovation.
                    </Text>
                </Col>
            </Row>
        </Layout>
    );
}
