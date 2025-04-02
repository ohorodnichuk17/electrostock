import * as React from "react";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";

export const BackButton = () => {
    let navigate = useNavigate();
    return (
        <>
            <Button
                icon={<ArrowLeftOutlined />}
                onClick={() => navigate(-1)}
                style={{ margin: '10px' }}
                shape="circle"
                ghost>
            </Button>
        </>
    );
};