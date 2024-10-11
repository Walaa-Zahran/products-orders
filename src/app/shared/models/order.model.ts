export interface ProductInOrder {
  ProductId: number|string;
  Quantity: number;
}

export interface Order {
  OrderId: number;
  OrderDate: string;
  UserId: string;
  Products: ProductInOrder[];
  PaymentType: string;
}
