export interface IOrderItem {
   id: number;
   orderDate: string;
   returnDate: string;
   componentId: number;
   userId: number;
   name?: string;
   quantity?: string;
}


export interface IOrderCreate {
   orderDate: string;
   returnDate: string;
   componentId: number | null;
   userId: number;
}