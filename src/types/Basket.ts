import { IProduct } from "./Product";

export interface IBasket {
    products: Map<string, IProduct>;
    total: number;
    addProduct(id: string): void;
    removeProduct(id: string): void;
}