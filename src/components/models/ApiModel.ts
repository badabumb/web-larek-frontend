import { IOrder, IOrderResult, IProduct } from "../../types";
import { ApiListResponse, Api } from "../base/api";

export interface IApiModel {
    resourcesUrl: string;
    items: IProduct[];
    fetchProducts: () => Promise<IProduct[]>;
    getOrderResult: (order: IOrder) => Promise<IOrderResult>;
}

export class ApiModel extends Api implements IApiModel {
    resourcesUrl: string;
    items: IProduct[];

    constructor(resourceUrl: string, baseUrl: string, options?: RequestInit) {
        super(baseUrl, options);
        this.resourcesUrl = resourceUrl;
    }

    fetchProducts(): Promise<IProduct[]> {
        return this.get('/product').then((data: ApiListResponse<IProduct>) => 
            data.items.map((item) => ({
                ...item,
                image: this.resourcesUrl + item.image,
            }))
        );
    }

    getOrderResult(order: IOrder): Promise<IOrderResult> {
        return this.post(`./order`, order).then((data: IOrderResult) => data);
    }
}