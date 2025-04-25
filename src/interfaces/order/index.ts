export interface IOrderItem {
    id: number;
    orderDate: string;
    returnDate: string;
    status: string;
    componentId: number;
    userId: number;
}

export interface IOrderCreate {
    orderDate: string;
    returnDate: string;
    status: string;
    componentId: number;
    userId: number;
}