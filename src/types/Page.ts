import { ICatalog } from ".";
import { IBasket } from "./Basket";

export interface IPage {
    counter: number;
    catalog: ICatalog;
    basket: IBasket;
}