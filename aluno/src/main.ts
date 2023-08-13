import Address from "./domain/entity/address";
import Customer from "./domain/entity/customer";
import OrderItem from "./domain/entity/orde_item";
import Order from "./domain/entity/order";

let customer = new Customer("1", "John");
const address = new Address("Street 1", 1, "12345-123", "New York");
customer.Address = address;
customer.activate();


// const item1 = new OrderItem("1", "Item 1", 10);
// const item2 = new OrderItem("2", "Item 2", 15);
// const order = new Order("1", "1", [item1, item2]);