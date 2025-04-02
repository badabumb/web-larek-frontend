# Проектная работа "Веб-ларек"

Стек: HTML, SCSS, TS, Webpack

Структура проекта:
- src/ — исходные файлы проекта
- src/components/ — папка с JS компонентами
- src/components/base/ — папка с базовым кодом

Важные файлы:
- src/pages/index.html — HTML-файл главной страницы
- src/types/ — папка с типами
- src/index.ts — точка входа приложения
- src/utils/constants.ts — файл с константами
- src/utils/utils.ts — файл с утилитами

## Архитектура системы, основные сущности  

### 1. **Product** (Товар)  
Описывает единицу товара.  

```
export interface IProduct {
    id: string;
    description: string;
    image: string;
    title: string;
    category: string;
    price: number | null;
}
```
* id – уникальный идентификатор товара.
* description – описание.
* image – ссылка на изображение.
* title – название товара.
* category – категория товара.
* price – цена (может быть null, если цена не указана).

### 2. **ShippingDetails** (Детали доставки)
Содержит информацию о способе оплаты и адресе доставки.

```
export interface IShippingDetails {
    payment: string;
    address: string;
}
```

### 3. **Contacts** (Контактные данные)
Описывает контактную информацию покупателя.

```
export interface IContacts {
    phone: string;
    email: string;
}
```

### 4. **Order** (Оформленный заказ)
Содержит информацию о заказе после оформления.

```
export interface IOrder extends IShippingDetails, IContacts {
    items: string[];
    total: number;
}
```

### 5. **OrderResult** (Результат заказа)
Содержит результат успешного оформления заказа.

```
export interface IOrderResult {
    id: string;
    total: number;
}
```

### 6. **FormErrors** (Ошибки валидации формы)
Определяет возможные ошибки валидации формы заказа.

```
export type FormErrors = Partial<Record<keyof IOrder, string>>;
```

---

## Установка и запуск
Для установки и запуска проекта необходимо выполнить команды

```
npm install
npm run start
```

или

```
yarn
yarn start
```
## Сборка

```
npm run build
```

или

```
yarn build
```
