import { IProduct } from "./Product";

export interface ICatalog {
    products: IProduct[];
    setCatalog(): void;
}

export interface IOrderResult {
    id: string;
    total: number;
}