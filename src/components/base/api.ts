export type ApiListResponse<Type> = { // описывает ответ сервера
	total: number;
	items: Type[];
};

// ограничение методов для POST
export type ApiPostMethods = "POST" | "PUT" | "DELETE";

export class Api {
	readonly baseUrl: string; // базовый URL сервера
	protected options: RequestInit;

	constructor(baseUrl: string, options: RequestInit = {}) {
		this.baseUrl = baseUrl;
		this.options = { // объект настроек запроса (RequestInit — стандартный тип Fetch API)
			headers: {
				"Content-Type": "application/json",
				...((options.headers as object) ?? {}),
			},
		};
	}

	protected handleResponse(response: Response): Promise<object> {
		if (response.ok) return response.json();
		else // если ошибка, получаем её текст (data.error или response.statusText)
			return response
				.json()
				.then((data) =>
					Promise.reject(data.error ?? response.statusText)
				);
	}

	get(uri: string) {
		return fetch(this.baseUrl + uri, {
			...this.options,
			method: "GET",
		}).then(this.handleResponse);
	}

	post(uri: string, data: object, method: ApiPostMethods = "POST") {
		return fetch(this.baseUrl + uri, {
			...this.options,
			method,
			body: JSON.stringify(data),
		}).then(this.handleResponse);
	}
}