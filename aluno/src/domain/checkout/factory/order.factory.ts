import OrderItem from "../entity/orde_item";
import Order from "../entity/order";

interface OrderFactoryInterface {
  id: string;
  customerId: string;
  items: {
    id: string;
    name: string;
    productId: string;
    quantity: number;
    price: number;
  } [] ;
}

export default class OrderFactory {

  public static create(orderProps: OrderFactoryInterface): Order {

    return new Order(
      orderProps.id,
      orderProps.customerId,
      orderProps.items.map(item => {
        return new OrderItem(
          item.id,
          item.name,
          item.price,
          item.productId,
          item.quantity);
      })
    );

  }



}