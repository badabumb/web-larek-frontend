import { IProduct } from "../../types";
import { createElement, cloneTemplate } from "../../utils/utils";
import { IEvents } from "../base/events";
import { IBasketItemViewConstructor } from "./BasketItemView";

export interface IBasketView {
	basket: HTMLElement;
	title: HTMLElement;
	basketList: HTMLElement;
	button: HTMLButtonElement;
	basketTotalPrice: HTMLElement;
	headerBasketButton: HTMLButtonElement;
	headerBasketCounter: HTMLElement;
	items: HTMLElement[];
	renderHeaderBasketCounter(value: number): void;
	renderTotalCost(total: number): void;
	render(): HTMLElement;
}

export class BasketView implements IBasketView {
	basket: HTMLElement;
	title: HTMLElement;
	basketList: HTMLElement;
	button: HTMLButtonElement;
	basketTotalPrice: HTMLElement;
	headerBasketButton: HTMLButtonElement;
	headerBasketCounter: HTMLElement;
	items: HTMLElement[];

	constructor(
		template: HTMLTemplateElement,
		protected events: IEvents,
		protected basketItemTemplate: HTMLTemplateElement,
        protected basketItemClass: IBasketItemViewConstructor
	) {
		this.basket = cloneTemplate<HTMLElement>(template);
		this.title = this.basket.querySelector(".modal__title");
		this.basketList = this.basket.querySelector(".basket__list");
		this.button = this.basket.querySelector(".basket__button");
		this.basketTotalPrice = this.basket.querySelector(".basket__price");
		this.headerBasketButton = document.querySelector(".header__basket");
		this.headerBasketCounter = document.querySelector(
			".header__basket-counter"
		);

		this.button.addEventListener("click", () => {
			this.events.emit("orderForm:open");
		});
		this.headerBasketButton.addEventListener("click", () => {
			this.events.emit("basket:open");
		});

		this.items = [];
	}

	renderItems(items: IProduct[]) {
		let i = 0;
		this.items = items.map((item) => {
			const basketItem = new this.basketItemClass(
				this.basketItemTemplate,
				this.events,
				() => this.events.emit("basket:removeFromBasket", item)
			);
			i = i + 1;
			return basketItem.render(item, i);
		});
		if (this.items.length) {
			this.basketList.replaceChildren(...this.items);
			this.button.removeAttribute("disabled");
		} else {
			this.button.setAttribute("disabled", "true");
			this.basketList.replaceChildren(
				createElement<HTMLParagraphElement>("p", {
					textContent: "Корзина пуста",
				})
			);
		}
	}

	renderHeaderBasketCounter(value: number) {
		this.headerBasketCounter.textContent = String(value);
	}

	renderTotalCost(total: number) {
		this.basketTotalPrice.textContent = String(total + " синапсов");
	}

	render() {
		this.title.textContent = "Корзина";
		return this.basket;
	}
}