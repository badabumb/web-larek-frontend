import { IProduct } from "../../types";
import { IEvents } from "../base/events";
import { CardView } from "./CardView";

export interface ICardModalView {
    description: HTMLElement;
    button: HTMLElement;
    
    render(data: IProduct): HTMLElement;
}

export class CardModalView extends CardView implements ICardModalView {
    description: HTMLElement;
    button: HTMLElement;

    constructor(
        template: HTMLTemplateElement,
        protected events: IEvents,
        clickHandler?: (event: MouseEvent) => void
    ) {
        super(template, events, clickHandler);
        this.description = this.cardElement.querySelector(".card__text");
 		this.button = this.cardElement.querySelector(".card__button");
        this.button.addEventListener("click", () => {
            this.events.emit("card:addBasket");
        });
    }

    render(data: IProduct): HTMLElement {
        super.render(data);
        this.description.textContent = data.description;
        if (!data.price) {
            this.button.setAttribute("disabled", "true");
        }

        return this.cardElement;
    }
}