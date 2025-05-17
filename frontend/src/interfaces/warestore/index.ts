import {IComponentItem} from "../component";

export interface IWareStoreItem {
    id: number;
    name: string;
    components: IComponentItem[];
}

export interface IWareStoreCreate {
    name: string;
}

export interface IWareStoreEdit {
    id: number;
    name: string;
}