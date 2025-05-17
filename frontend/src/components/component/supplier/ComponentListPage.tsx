import { useEffect, useState } from 'react';
import {Button, message} from 'antd';
import {apiClient} from "../../../utils/api/apiClient.ts";
import {IComponentItem} from "../../../interfaces/component";
import ComponentList from "../ComponentList.tsx";
import {Link} from "react-router-dom";
import {PlusOutlined} from "@ant-design/icons";
import {useAppSelector} from "../../../hooks/redux";

export default function ComponentListPage() {
    const [components, setComponents] = useState<IComponentItem[]>([]);
    const { isSupplier } = useAppSelector(state => state.authentication);

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

    return (
        <div style={{ padding: '20px', backgroundColor: '#f9f9f9' }}>
            {isSupplier && (
                <Link to="/component/create">
                    <Button
                        type="primary"
                        icon={<PlusOutlined />}
                        style={{
                            borderColor: '#C39964',
                            color: '#fff',
                            backgroundColor: '#C39964',
                            transition: 'all 0.3s ease',
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = '#B88C56';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = '#C39964';
                        }}
                    >
                        Create Component
                    </Button>
                </Link>
            )}
            <h1 style={{ color: '#C39964', fontSize: '28px', fontWeight: 'bold', marginBottom: '20px' }}>
                Components
            </h1>
            {components.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '50px' }}>
                    <span>No components available</span>
                </div>
            ) : (
                <ComponentList components={components} />
            )}
        </div>
    );
}
