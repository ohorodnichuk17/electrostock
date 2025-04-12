export interface IComponentItem {
    id: number;
    quantity: number;
    name: string;
    description: string;
    category: string;
    stockStatus: string;
    imageUrl: string;
    wareStoreId: number;
}

export interface IComponentCreate {
    quantity: number;
    name: string;
    description: string;
    category: string;
    stockStatus: string;
    imageUrl: string;
    wareStoreId: number;
}

export interface IComponentEdit {
    id: number;
    quantity: number;
    name: string;
    description: string;
    category: string;
    stockStatus: string;
    imageUrl: string;
    wareStoreId: number;
}