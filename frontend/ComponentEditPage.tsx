import { useEffect, useState } from "react";
import { useAppSelector } from "../../../hooks/redux";
import { useNavigate, useParams } from "react-router-dom";
import { IWareStoreItem } from "../../../interfaces/warestore";
import { apiClient } from "../../../utils/api/apiClient.ts";
import { Button, Form, Input, InputNumber, message, Select } from "antd";
import { IComponentEdit } from "../../../interfaces/component";

const { Option } = Select;

export default function ComponentEditPage() {
   const { id } = useParams();
   const [loading, setLoading] = useState(false);
   const { isSupplier } = useAppSelector(state => state.authentication);
   const [form] = Form.useForm();
   const navigate = useNavigate();
   const [warestores, setWarestores] = useState<IWareStoreItem[]>([]);

   const [componentData, setComponentData] = useState<IComponentEdit | null>(null);

   useEffect(() => {
      const fetchComponent = async () => {
         setLoading(true);
         try {
            const response = await apiClient.get(`api/component/${id}`);
            setComponentData(response.data);
         } catch (error) {
            message.error('Не вдалося отримати дані компонента');
         } finally {
            setLoading(false);
         }
      };

      if (id) {
         fetchComponent();
      }
   }, [id]);

   useEffect(() => {
      if (componentData) {
         form.setFieldsValue({
            name: componentData.name,
            quantity: componentData.quantity,
            description: componentData.description,
            category: componentData.category,
            stockStatus: componentData.stockStatus,
            wareStoreId: componentData.wareStoreId,
            imageUrl: componentData.imageUrl,
         });
      }
   }, [componentData, form]);

   const onFinish = async (values: IComponentEdit) => {
      setLoading(true);
      const data = { ...values, id };
      try {
         await apiClient.put('api/component/edit', data);
         navigate('/components');
         message.success('Component updated successfully');
      } catch (error) {
         console.error('Error updating component:', error);
         message.error('Failed to update component');
      } finally {
         setLoading(false);
      }
   }

   useEffect(() => {
      const fetchWarestores = async () => {
         try {
            const response = await apiClient.get("api/ware-store");
            console.log(response.data);
            setWarestores(response.data);
         } catch (error) {
            console.error("Error fetching warehouses: ", error);
            message.error("Failed to load warehouses.");
         }
      };

      fetchWarestores();
   }, []);

   return (
      <div
         style={{
            padding: '20px',
            backgroundColor: '#f9f9f9',
            minHeight: '100vh',
            fontFamily: 'Arial, sans-serif',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
         }}
      >
         <div
            style={{
               maxWidth: '600px',
               width: '100%',
               backgroundColor: '#ffffff',
               borderRadius: '12px',
               boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
               padding: '30px',
               border: '1px solid #ddd',
            }}
         >
            {!isSupplier ? (
               <div
                  style={{
                     textAlign: 'center',
                     color: '#555',
                     fontSize: '16px',
                     fontWeight: 'bold',
                  }}
               >
                  You must be a{' '}
                  <span
                     style={{
                        color: '#C39964',
                        fontWeight: 'bold',
                     }}
                  >
                     supplier
                  </span>{' '}
                  to edit a component!
               </div>
            ) : (
               <>
                  <h1
                     style={{
                        color: '#C39964',
                        fontSize: '24px',
                        fontWeight: 'bold',
                        marginBottom: '20px',
                        textAlign: 'center',
                     }}
                  >
                     Edit Component
                  </h1>
                  <Form
                     layout="vertical"
                     onFinish={onFinish}
                     style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '15px',
                     }}
                  >
                     <Form.Item
                        label={
                           <span
                              style={{
                                 color: '#333',
                                 fontWeight: 'bold',
                              }}
                           >
                              Name
                           </span>
                        }
                        name="name"
                        rules={[{ required: true, message: 'Please enter component name!' }]}
                     >
                        <Input
                           placeholder="Enter component name"
                           style={{
                              height: '40px',
                              borderRadius: '6px',
                              border: '1px solid #ddd',
                              fontSize: '14px',
                              padding: '0 8px',
                           }}
                           onFocus={(e) => {
                              e.target.style.borderColor = '#C39964';
                           }}
                        />
                     </Form.Item>

                     <Form.Item
                        label={
                           <span
                              style={{
                                 color: '#333',
                                 fontWeight: 'bold',
                              }}
                           >
                              Quantity
                           </span>
                        }
                        name="quantity"
                        rules={[{ required: true, message: 'Please enter component quantity!' }]}
                     >
                        <InputNumber
                           placeholder="Enter component quantity"
                           style={{
                              height: '40px',
                              borderRadius: '6px',
                              border: '1px solid #ddd',
                              fontSize: '14px',
                              padding: '0 8px',
                           }}
                           onFocus={(e) => {
                              e.target.style.borderColor = '#C39964';
                           }}
                        />
                     </Form.Item>

                     <Form.Item
                        label={
                           <span
                              style={{
                                 color: '#333',
                                 fontWeight: 'bold',
                              }}
                           >
                              Description
                           </span>
                        }
                        name="description"
                        rules={[{ required: true, message: 'Please enter component description!' }]}
                     >
                        <Input.TextArea
                           placeholder="Enter component description"
                           style={{
                              height: '60px',
                              borderRadius: '6px',
                              border: '1px solid #ddd',
                              fontSize: '14px',
                              padding: '8px',
                           }}
                           onFocus={(e) => {
                              e.target.style.borderColor = '#C39964';
                           }}
                        />
                     </Form.Item>

                     <Form.Item
                        label={
                           <span
                              style={{
                                 color: '#333',
                                 fontWeight: 'bold',
                              }}
                           >
                              Category
                           </span>
                        }
                        name="category"
                        rules={[{ required: true, message: 'Please enter component category!' }]}
                     >
                        <Select
                           placeholder="Select component category"
                           style={{
                              height: '40px',
                              borderRadius: '6px',
                              fontSize: '14px',
                           }}
                           onFocus={(e) => {
                              e.target.style.borderColor = '#C39964';
                           }}
                        >
                           <Option value="resistor">Resistor</Option>
                           <Option value="transistor">Transistor</Option>
                           <Option value="microchip">Microchip</Option>
                           <Option value="controller">Controller</Option>
                        </Select>
                     </Form.Item>

                     <Form.Item
                        label={
                           <span
                              style={{
                                 color: '#333',
                                 fontWeight: 'bold',
                              }}
                           >
                              Stock status
                           </span>
                        }
                        name="stockStatus"
                        rules={[{ required: true, message: 'Please enter component stock status!' }]}
                     >
                        <Select
                           placeholder="Select component stock status"
                           style={{
                              height: '40px',
                              borderRadius: '6px',
                              fontSize: '14px',
                           }}
                           onFocus={(e) => {
                              e.target.style.borderColor = '#C39964';
                           }}
                        >
                           <Option value="in stock">In stock</Option>
                           <Option value="on order">On order</Option>
                           <Option value="in reserve">In reserve</Option>
                        </Select>
                     </Form.Item>

                     <Form.Item
                        label={
                           <span
                              style={{
                                 color: '#333',
                                 fontWeight: 'bold',
                              }}
                           >
                              Warehouse
                           </span>
                        }
                        name="wareStoreId"
                        rules={[{ required: true, message: 'Please enter component warehouse!' }]}
                     >
                        <Select
                           placeholder="Select component warehouse"
                           style={{
                              height: '40px',
                              borderRadius: '6px',
                              fontSize: '14px',
                           }}
                           onFocus={(e) => {
                              e.target.style.borderColor = '#C39964';
                           }}
                        >
                           {warestores.map((warestore) => (
                              <Option key={warestore.id} value={warestore.id}>
                                 {warestore.name}
                              </Option>
                           ))}
                        </Select>
                     </Form.Item>

                     <Form.Item
                        label={
                           <span
                              style={{
                                 color: '#333',
                                 fontWeight: 'bold',
                              }}
                           >
                              Image URL
                           </span>
                        }
                        name="imageUrl"
                        rules={[{ required: true, message: 'Please enter component image url!' }]}
                     >
                        <Input.TextArea
                           placeholder="Enter component image url"
                           style={{
                              height: '40px',
                              borderRadius: '6px',
                              border: '1px solid #ddd',
                              fontSize: '14px',
                              padding: '8px',
                           }}
                           onFocus={(e) => {
                              e.target.style.borderColor = '#C39964';
                           }}
                        />
                     </Form.Item>

                     <Form.Item>
                        <Button
                           type="primary"
                           htmlType="submit"
                           loading={loading}
                           style={{
                              backgroundColor: '#C39964',
                              borderColor: '#C39964',
                              height: '40px',
                              fontSize: '14px',
                              fontWeight: 'bold',
                              borderRadius: '6px',
                              width: '100%',
                              transition: 'background-color 0.3s ease',
                           }}
                           onMouseEnter={(e) => {
                              e.currentTarget.style.backgroundColor = '#b38954';
                           }}
                           onMouseLeave={(e) => {
                              e.currentTarget.style.backgroundColor = '#C39964';
                           }}
                        >
                           Submit
                        </Button>
                     </Form.Item>
                  </Form>
               </>
            )}
         </div>
      </div>
   );
}