import { IProduct } from "../../types";
import { IEvents } from "../base/events";
import { CardView } from "./CardView";
import { ICardViewConstructor } from "./CardView";

export interface ICardListView {
    render(data: IProduct[]): HTMLElement;
}

export class CardListView implements ICardListView {
    constructor(
        public catalogElement: HTMLElement,
        protected events: IEvents,
        protected catalogCardTemplate: HTMLTemplateElement,
        protected catalogCardClass: ICardViewConstructor
    ) {}

    render(data: IProduct[]): HTMLElement {
        data.forEach((item) => {
            const card = new this.catalogCardClass(
                this.catalogCardTemplate,
                this.events,
                () => this.events.emit("card:select", item)
            );
            this.catalogElement.append(card.render(item));
        });
        return this.catalogElement;
    }
}