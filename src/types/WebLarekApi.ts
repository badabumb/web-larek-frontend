import { ICatalog, IOrderResult } from ".";
import { IProduct } from "./Product";
import { IOrderData } from "./OrderData";

export interface IWebLarekApi {
    getCatalog(): Promise<ICatalog>;
    getProduct(id: number): Promise<IProduct>;
    makeOrder(data: IOrderData): Promise<IOrderResult>;
}