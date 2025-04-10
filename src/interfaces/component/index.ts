export interface IComponentItem {
    id: number;
    quantity: number;
    name: string;
    description: string;
    category: string;
    manufacturer: string;
    stockStatus: string;
    imageUrl: string;
    wareStoreId: number;
    userId: number;
}

export interface IComponentCreate {
    quantity: number;
    name: string;
    description: string;
    category: string;
    manufacturer: string;
    stockStatus: string;
    imageUrl: string;
    wareStoreId: number;
    userId: number;
}

export interface IComponentEdit {
    id: number;
    quantity: number;
    name: string;
    description: string;
    category: string;
    manufacturer: string;
    stockStatus: string;
    imageUrl: string;
    wareStoreId: number;
    userId: number;
}