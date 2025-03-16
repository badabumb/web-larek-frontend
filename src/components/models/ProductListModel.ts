import { IProduct } from "../../types";
import { IEvents } from "../base/events";

export interface IProductListModel {
    productCards: IProduct[];
    selectedCard: IProduct;

    showCard(item: IProduct): void;
}

export class ProductListModel implements IProductListModel {
    protected _productCards: IProduct[];
    selectedCard: IProduct;

    constructor(protected events: IEvents) {
        this._productCards = []
    }

    set productCards(data: IProduct[]) {
        this._productCards = data;
        this.events.emit("products:set");
    }

    get productCards() {
        return this._productCards;
    }

    showCard(item: IProduct) {
        this.selectedCard = item;
        this.events.emit("cardModal:open", item);
    }
}