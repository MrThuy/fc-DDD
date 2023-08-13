import OrderItem from "./orde_item";
import Order from "./order";

describe("Order unit tests", () => {

  it("should throw error when id is empty", () => {
    expect(() => {
      let order = new Order("", "123", []);
    }).toThrowError("Id is required");
  });

  it("should throw error when customerId is empty", () => {
    expect(() => {
      let order = new Order("123", "", []);
    }).toThrowError("CustomerId is required");
  });

  it("should throw error when itens is empty", () => {
    expect(() => {
      let order = new Order("123", "123", []);
    }).toThrowError("Items is required");
  });

  it("should calculate total", () => {
    const item = new OrderItem("i1", "item 1", 100, "p1", 2);
    const item2 = new OrderItem("i2", "item 1", 200, "p2", 2);
    const order = new Order("o1", "c1", [item]);

    expect(order.total()).toBe(200);

    const order2 = new Order("o2", "c1", [item,item2]);
    expect(order2.total()).toBe(600);
  });

  it("should throw erro if the item qtd is less or equal than 0", () => {

    expect(() => {
      const item = new OrderItem("i1", "item 1", 100, "p1", 0);
      const order = new Order("o1", "c1", [item]);
    }).toThrowError("Item quantity must be greater than 0");
  });

});