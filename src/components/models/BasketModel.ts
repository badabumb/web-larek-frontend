import { IProduct } from "../../types";

export interface IBasketModel {
    basketProducts: IProduct[];
    getAmount: () => number;
    getTotalCost: () => number;
    addToBasket(data: IProduct): void;
    deleteFromBasket(item: IProduct): void;
    clearBasket(): void;
}

export class BasketModel implements IBasketModel {
    protected _basketProducts: Set<IProduct>;

    constructor() {
        this._basketProducts = new Set<IProduct>();
    }

    set basketProducts(data: IProduct[]) {
        this._basketProducts = new Set<IProduct>(data);
    }

    get basketProducts() {
        return Array.from(this._basketProducts);
    }

    getAmount() {
        return this.basketProducts.length;
    }

    getTotalCost() {
        let total = 0;
        this.basketProducts.forEach(item => {
            total += item.price;
        });

        return total;
        return this.basketProducts.reduce((total, item) => total + item.price, 0)
    }

    addToBasket(item: IProduct) {
        this._basketProducts.add(item);
    }

    deleteFromBasket(item: IProduct) {
        this._basketProducts.delete(item);
    }

    clearBasket() {
        this.basketProducts = [];
    }
}