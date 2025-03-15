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
    protected _basketProducts: IProduct[];

    constructor() {
        this._basketProducts = [];
    }

    set basketProducts(data: IProduct[]) {
        this.basketProducts = data;
    }

    get basketProducts() {
        return this._basketProducts;
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

    addToBasket(data: IProduct) {
        this._basketProducts.push(data);
    }

    deleteFromBasket(item: IProduct) {
        const index = this.basketProducts.indexOf(item);
        
        if (index != -1) {
            this._basketProducts.splice(index, 1);
        }
    }

    clearBasket() {
        this.basketProducts = [];
    }
}