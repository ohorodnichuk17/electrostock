import { useEffect, useState } from 'react';
import { message } from 'antd';
import { IComponentItem } from '../../interfaces/component';
import { apiClient } from '../../utils/api/apiClient.ts';
import ComponentList from "../component/ComponentList.tsx";

export default function ResistorWarestore() {
    const [components, setComponents] = useState<IComponentItem[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await apiClient.get<IComponentItem[]>('api/component');
                const filtered = response.data.filter(item => item.category === 'resistor');
                setComponents(filtered);
            } catch (error) {
                console.error('Error fetching components:', error);
                message.error('Failed to fetch components');
            }
        };
        fetchData();
    }, []);

    return (
        <div style={{ padding: '20px', backgroundColor: '#f9f9f9' }}>
            <h1 style={{ color: '#C39964', fontSize: '28px', fontWeight: 'bold', marginBottom: '20px' }}>
                Resistors
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
