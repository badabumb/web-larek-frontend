import { IBasket } from "./Basket";

export interface IOrderData {
    payment: string;
    address: string;
    email: string;
    phone: string;
    products: string[];
    total: number;
    getProductsFromBasket(basket: IBasket): void;
}