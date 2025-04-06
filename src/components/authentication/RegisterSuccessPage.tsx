import { Typography, Button } from "antd";
import { Link, useNavigate } from "react-router-dom";

const { Title, Paragraph } = Typography;

export default function RegisterSuccessPage() {
    const navigate = useNavigate();

    const handleLoginRedirect = () => {
        navigate("/login");
    };

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                minHeight: "100vh",
                backgroundColor: "#f5f5f5",
                padding: "20px",
            }}
        >
            <Title
                level={2}
                style={{
                    color: "#C39964",
                    textAlign: "center",
                    marginBottom: "20px",
                }}
            >
                Registration Successful! 🎉
            </Title>

            <Paragraph
                style={{
                    fontSize: "16px",
                    color: "#555555",
                    textAlign: "center",
                    maxWidth: "500px",
                    marginBottom: "30px",
                }}
            >
                Thank you for registering with ElectroStock! You can now log in to your account and start exploring all the features.
            </Paragraph>

            <Button
                type="primary"
                size="large"
                onClick={handleLoginRedirect}
                style={{
                    backgroundColor: "#C39964",
                    borderColor: "#C39964",
                    fontWeight: "bold",
                    padding: "0 40px",
                }}
            >
                Log In
            </Button>
        </div>
    );
}