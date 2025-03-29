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
- src/scss/styles.scss — корневой файл стилей
- src/utils/constants.ts — файл с константами
- src/utils/utils.ts — файл с утилитами

## Архитектура системы, основные сущности  

### 1. **Catalog** (Каталог товаров)  
Каталог содержит список доступных товаров и предоставляет интерфейс для их получения.  

```
typescript
export interface ICatalog {
    products: IProduct[];
    setCatalog(): void;
}
```
* products – массив товаров.
* setCatalog() – метод для загрузки каталога.

### 2. **Basket**  
- Содержит товары, которые пользователь выбрал для покупки.  
- Может включать несколько товаров из каталога.  
- Является **родительским** объектом для **OrderData**.  

```
export interface IBasket {
    products: Map<string, IProduct>;
    total: number;
    addProduct(id: string): void;
    removeProduct(id: string): void;
}
```
* products – товары, добавленные пользователем.
* total – итоговая сумма заказа.
* addProduct(id: string) – добавляет товар в корзину.
* removeProduct(id: string) – удаляет товар из корзины.


### 3. **OrderData**  
- Содержит информацию о заказе после его оформления.  
- Является **дочерним** объектом для **Basket**.  

```
export interface IOrderData {
    payment: string;
    address: string;
    email: string;
    phone: string;
    products: string[];
    total: number;
    getProductsFromBasket(basket: IBasket): void;
}
```
* payment – способ оплаты.
* address, email, phone – контактные данные.
* products – список товаров.
* total – итоговая сумма заказа.
* getProductsFromBasket(basket: IBasket) – метод, извлекающий товары из корзины.

---
### Взаимодействие сущностей  
- **Catalog ↔ Basket**: Пользователь добавляет товары в корзину.  
- **Basket ↔ OrderData**: После оформления заказа данные передаются в объект **OrderData**. 

### API-интерфейсы

Для взаимодействия с сервером используется следующий API:

```
export interface IWebLarekApi {
    getCatalog(): Promise<ICatalog>;
    getProduct(id: number): Promise<IProduct>;
    makeOrder(data: IOrderData): Promise<IOrderResult>;
}
```
* getCatalog() – загружает каталог товаров.
* getProduct(id: number) – получает информацию о товаре.
* makeOrder(data: IOrderData) – отправляет заказ.


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
