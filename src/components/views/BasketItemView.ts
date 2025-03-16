import { IActions, IProduct } from "../../types";
import { IEvents } from "../base/events";
import { cloneTemplate } from "../../utils/utils";

export interface IBasketItemView {
    basketItem: HTMLElement;
    index: HTMLElement;
    title: HTMLElement;
    price: HTMLElement;
    deleteButton: HTMLButtonElement;
    render(data: IProduct, item: number): HTMLElement;
}

export class BasketItemView implements IBasketItemView {
    basketItem: HTMLElement;
 	index: HTMLElement;
 	title: HTMLElement;
 	price: HTMLElement;
 	deleteButton: HTMLButtonElement;

    constructor(
        template: HTMLTemplateElement,
        protected events: IEvents,
        actions?: IActions,
    ) {
        this.basketItem = cloneTemplate<HTMLElement>(template);
 		this.index = this.basketItem.querySelector(".basket__item-index");
 		this.title = this.basketItem.querySelector(".card__title");
 		this.price = this.basketItem.querySelector(".card__price");
 		this.deleteButton = this.basketItem.querySelector(
 			".basket__item-delete"
 		);

        if (actions?.onClick) {
            this.deleteButton.addEventListener("click", actions.onClick);
        }
    }

    getPriceText(value: null | number): string {
        return value === null ? "Бесценно" : String(value) + " синапсов";
    }

    render(data: IProduct, item: number) {
        this.index.textContent = String(item);
        this.title.textContent = data.title;
        this.price.textContent = this.getPriceText(data.price);
        return this.basketItem;
    }
}